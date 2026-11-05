const fs = require('fs');
try {
  const [, , inPath, outPath] = process.argv;
  if (!inPath || !outPath) throw new Error('usage: ua-tour-analyze <input> <output>');
  const { nodes, edges, layers } = JSON.parse(fs.readFileSync(inPath, 'utf8'));
  const ids = new Set(nodes.map(n => n.id));
  const byId = new Map(nodes.map(n => [n.id, n]));
  // Only edges between file-level nodes are structural signal here; contains/exports point at child nodes.
  const fileEdges = edges.filter(e => ids.has(e.source) && ids.has(e.target) && e.source !== e.target);

  const inSets = new Map(nodes.map(n => [n.id, new Set()]));
  const outSets = new Map(nodes.map(n => [n.id, new Set()]));
  for (const e of fileEdges) { inSets.get(e.target).add(e.source); outSets.get(e.source).add(e.target); }
  const fanIn = id => inSets.get(id).size;
  const fanOut = id => outSets.get(id).size;

  const fanInRanking = nodes.map(n => ({ id: n.id, fanIn: fanIn(n.id), name: n.name }))
    .sort((a, b) => b.fanIn - a.fanIn || a.id.localeCompare(b.id)).slice(0, 20);
  const fanOutRanking = nodes.map(n => ({ id: n.id, fanOut: fanOut(n.id), name: n.name }))
    .sort((a, b) => b.fanOut - a.fanOut || a.id.localeCompare(b.id)).slice(0, 20);

  const ENTRY = new Set(['index.ts','index.js','main.ts','main.js','main.jsx','main.tsx','app.ts','app.js','server.ts','server.js','mod.rs','main.go','main.py','main.rs','manage.py','app.py','wsgi.py','asgi.py','run.py','__main__.py','Application.java','Main.java','Program.cs','config.ru','index.php','App.swift','Application.kt','main.cpp','main.c']);
  const sortedOut = nodes.map(n => fanOut(n.id)).sort((a, b) => b - a);
  const sortedIn = nodes.map(n => fanIn(n.id)).sort((a, b) => a - b);
  const outCut = sortedOut[Math.max(0, Math.ceil(nodes.length * 0.1) - 1)] || 0;
  const inCut = sortedIn[Math.max(0, Math.ceil(nodes.length * 0.25) - 1)] || 0;
  const scored = nodes.map(n => {
    const fp = n.filePath || n.name || '';
    const depth = fp.split('/').length - 1;
    let score = 0;
    if (n.type === 'document') {
      if (/^readme\.md$/i.test(fp)) score += 5;
      else if (depth === 0 && /\.md$/i.test(fp)) score += 2;
    } else if (n.type === 'file') {
      if (ENTRY.has(n.name)) score += 3;
      if (depth <= 1) score += 1;
      if (fanOut(n.id) >= outCut && outCut > 0) score += 1;
      if (fanIn(n.id) <= inCut) score += 1;
    }
    return { id: n.id, score, name: n.name, type: n.type, summary: n.summary };
  }).filter(c => c.score > 0).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const entryPointCandidates = scored.slice(0, 5).map(({ type, ...c }) => c);

  // BFS from the top code entry point, following imports and calls forward.
  const start = scored.find(c => c.type === 'file');
  const adj = new Map();
  for (const e of fileEdges) {
    if (e.type !== 'imports' && e.type !== 'calls') continue;
    if (!adj.has(e.source)) adj.set(e.source, new Set());
    adj.get(e.source).add(e.target);
  }
  const order = [], depthMap = {}, byDepth = {};
  if (start) {
    depthMap[start.id] = 0;
    const q = [start.id];
    while (q.length) {
      const cur = q.shift();
      order.push(cur);
      const d = depthMap[cur];
      (byDepth[d] = byDepth[d] || []).push(cur);
      for (const t of adj.get(cur) || []) if (!(t in depthMap)) { depthMap[t] = d + 1; q.push(t); }
    }
  }

  const pick = types => nodes.filter(n => types.includes(n.type)).map(n => ({ id: n.id, name: n.name, type: n.type, summary: n.summary }));
  const nonCodeFiles = {
    documentation: pick(['document']),
    infrastructure: pick(['service', 'pipeline', 'resource']),
    data: pick(['table', 'schema', 'endpoint']),
    config: pick(['config']),
  };

  // Clusters: seed from bidirectional pairs, expand with nodes linked to 2+ members.
  const undirected = new Map(nodes.map(n => [n.id, new Set()]));
  for (const e of fileEdges) { undirected.get(e.source).add(e.target); undirected.get(e.target).add(e.source); }
  const seeds = [];
  for (const e of fileEdges) {
    if (e.type !== 'imports' && e.type !== 'calls') continue;
    if (e.source < e.target && fileEdges.some(r => r.type === e.type && r.source === e.target && r.target === e.source)) seeds.push([e.source, e.target]);
  }
  // Fall back to the densest triangles when the graph has no import cycles.
  if (!seeds.length) {
    for (const e of fileEdges) {
      for (const c of undirected.get(e.source)) {
        if (c !== e.target && undirected.get(e.target).has(c)) seeds.push([e.source, e.target, c]);
      }
    }
  }
  const seen = new Set();
  const clusters = [];
  for (const seed of seeds) {
    const set = new Set(seed);
    for (const n of nodes) {
      if (set.size >= 5) break;
      if (set.has(n.id)) continue;
      if ([...set].filter(m => undirected.get(n.id).has(m)).length >= 2) set.add(n.id);
    }
    const key = [...set].sort().join('|');
    if (seen.has(key)) continue;
    seen.add(key);
    const edgeCount = fileEdges.filter(e => set.has(e.source) && set.has(e.target)).length;
    clusters.push({ nodes: [...set].sort(), edgeCount });
  }
  clusters.sort((a, b) => b.edgeCount - a.edgeCount);

  const nodeSummaryIndex = {};
  for (const n of nodes) nodeSummaryIndex[n.id] = { name: n.name, type: n.type, summary: n.summary };

  fs.writeFileSync(outPath, JSON.stringify({
    scriptCompleted: true,
    entryPointCandidates,
    fanInRanking,
    fanOutRanking,
    bfsTraversal: { startNode: start ? start.id : null, order, depthMap, byDepth },
    nonCodeFiles,
    clusters: clusters.slice(0, 10),
    layers: { count: layers.length, list: layers },
    nodeSummaryIndex,
    totalNodes: nodes.length,
    totalEdges: edges.length,
  }, null, 2));
  process.exit(0);
} catch (err) {
  console.error(err.stack || String(err));
  process.exit(1);
}
