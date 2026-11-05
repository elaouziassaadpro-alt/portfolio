#!/usr/bin/env node
// Structural analysis for architecture layering. Usage: node ua-arch-analyze.js <input.json> <output.json>
const fs = require('fs');

const DIR_PATTERNS = {
  api: ['routes', 'api', 'controllers', 'endpoints', 'handlers', 'serializers', 'controller', 'routers', 'blueprints'],
  service: ['services', 'core', 'lib', 'domain', 'logic', 'signals', 'internal', 'composables', 'mailers', 'jobs', 'channels'],
  data: ['models', 'db', 'data', 'persistence', 'repository', 'entities', 'migrations', 'entity', 'sql', 'database', 'schema'],
  ui: ['components', 'views', 'pages', 'ui', 'layouts', 'screens'],
  middleware: ['middleware', 'plugins', 'interceptors', 'guards'],
  utility: ['utils', 'helpers', 'common', 'shared', 'tools', 'templatetags', 'pkg'],
  config: ['config', 'constants', 'env', 'settings', 'management', 'commands'],
  test: ['__tests__', 'test', 'tests', 'spec', 'specs'],
  types: ['types', 'interfaces', 'schemas', 'contracts', 'dtos', 'dto', 'request', 'response'],
  hooks: ['hooks'],
  state: ['store', 'state', 'reducers', 'actions', 'slices'],
  assets: ['assets', 'static', 'public'],
  entry: ['cmd', 'bin'],
  documentation: ['docs', 'documentation', 'wiki'],
  infrastructure: ['deploy', 'deployment', 'infra', 'infrastructure', 'k8s', 'kubernetes', 'helm', 'charts', 'terraform', 'tf', 'docker'],
  'ci-cd': ['.github', '.gitlab', '.circleci'],
};
const dirLabel = {};
for (const [label, names] of Object.entries(DIR_PATTERNS)) for (const n of names) dirLabel[n] = label;

function filePattern(p) {
  const base = p.split('/').pop();
  if (/\.(test|spec)\.[^.]+$/.test(base) || /^test_.*\.py$/.test(base) || /_test\.go$/.test(base) || /Test\.(java|php)$/.test(base) || /_spec\.rb$/.test(base) || /Tests\.cs$/.test(base)) return 'test';
  if (/\.d\.ts$/.test(base)) return 'types';
  if (['index.ts', 'index.js', '__init__.py', 'config.ru', 'Application.java', 'Program.cs'].includes(base)) return 'entry';
  if (p === 'manage.py' || /^cmd\/[^/]+\/main\.go$/.test(p) || p === 'src/main.rs' || p === 'src/lib.rs') return 'entry';
  if (['wsgi.py', 'asgi.py', 'Cargo.toml', 'go.mod', 'Gemfile', 'pom.xml', 'build.gradle', 'composer.json'].includes(base)) return 'config';
  if (/^Dockerfile/.test(base) || /^docker-compose\./.test(base) || /\.(tf|tfvars)$/.test(base) || base === 'Makefile') return 'infrastructure';
  if (/^\.github\/workflows\//.test(p) || base === '.gitlab-ci.yml' || base === 'Jenkinsfile') return 'ci-cd';
  if (/\.sql$/.test(base)) return 'data';
  if (/\.(graphql|gql|proto)$/.test(base)) return 'types';
  if (/\.(md|rst)$/.test(base)) return 'documentation';
  return null;
}

function main() {
  const [, , inPath, outPath] = process.argv;
  if (!inPath || !outPath) throw new Error('usage: ua-arch-analyze.js <input.json> <output.json>');
  const input = JSON.parse(fs.readFileSync(inPath, 'utf8'));
  const nodes = input.fileNodes || [];
  const importEdges = input.importEdges || [];
  const allEdges = input.allEdges || [];
  const ids = new Set(nodes.map((n) => n.id));

  // Common directory prefix
  const dirs = nodes.map((n) => n.filePath.split('/').slice(0, -1));
  let prefix = dirs.length ? dirs[0].slice() : [];
  for (const d of dirs) {
    let i = 0;
    while (i < prefix.length && i < d.length && prefix[i] === d[i]) i++;
    prefix = prefix.slice(0, i);
  }
  const isFlat = dirs.every((d) => d.length === prefix.length);

  const groupOf = {};
  const directoryGroups = {};
  const nodeTypeGroups = {};
  for (const n of nodes) {
    const segs = n.filePath.split('/').slice(prefix.length);
    let g;
    if (isFlat) g = filePattern(n.filePath) || n.filePath.split('.').pop();
    else g = segs.length > 1 ? segs[0] : 'root';
    groupOf[n.id] = g;
    (directoryGroups[g] = directoryGroups[g] || []).push(n.id);
    (nodeTypeGroups[n.type] = nodeTypeGroups[n.type] || []).push(n.id);
  }

  // Sub-groups under src, since a single-package project keeps its structure one level down
  const srcSubGroups = {};
  for (const n of nodes) {
    const m = n.filePath.match(/^src\/([^/]+)\//);
    if (m) (srcSubGroups[m[1]] = srcSubGroups[m[1]] || []).push(n.id);
    else if (n.filePath.startsWith('src/')) (srcSubGroups['(src root)'] = srcSubGroups['(src root)'] || []).push(n.id);
  }

  // Fan-in / fan-out
  const fileFanIn = {};
  const fileFanOut = {};
  const interCount = {};
  const internal = {};
  const total = {};
  const subInter = {};
  const subOf = (id) => {
    const n = nodes.find((x) => x.id === id);
    if (!n) return null;
    const m = n.filePath.match(/^src\/([^/]+)\//);
    return m ? m[1] : n.filePath.startsWith('src/') ? '(src root)' : groupOf[id];
  };
  for (const e of importEdges) {
    if (!ids.has(e.source) || !ids.has(e.target)) continue;
    fileFanOut[e.source] = (fileFanOut[e.source] || 0) + 1;
    fileFanIn[e.target] = (fileFanIn[e.target] || 0) + 1;
    const a = groupOf[e.source];
    const b = groupOf[e.target];
    total[a] = (total[a] || 0) + 1;
    if (a === b) internal[a] = (internal[a] || 0) + 1;
    else {
      total[b] = (total[b] || 0) + 1;
      const k = a + '\u0000' + b;
      interCount[k] = (interCount[k] || 0) + 1;
    }
    const sa = subOf(e.source);
    const sb = subOf(e.target);
    if (sa !== sb) subInter[sa + '\u0000' + sb] = (subInter[sa + '\u0000' + sb] || 0) + 1;
  }
  const toPairs = (o) => Object.entries(o).map(([k, count]) => {
    const [from, to] = k.split('\u0000');
    return { from, to, count };
  }).sort((x, y) => y.count - x.count);
  const interGroupImports = toPairs(interCount);
  const srcSubGroupImports = toPairs(subInter);

  const intraGroupDensity = {};
  for (const g of Object.keys(directoryGroups)) {
    const t = total[g] || 0;
    const i = internal[g] || 0;
    intraGroupDensity[g] = { internalEdges: i, totalEdges: t, density: t ? +(i / t).toFixed(3) : 0 };
  }

  // Cross-category
  const typeOf = Object.fromEntries(nodes.map((n) => [n.id, n.type]));
  const cross = {};
  for (const e of allEdges) {
    const f = typeOf[e.source];
    const t = typeOf[e.target];
    if (!f || !t) continue;
    const k = [f, t, e.type].join('\u0000');
    cross[k] = (cross[k] || 0) + 1;
  }
  const crossCategoryEdges = Object.entries(cross).map(([k, count]) => {
    const [fromType, toType, edgeType] = k.split('\u0000');
    return { fromType, toType, edgeType, count };
  }).sort((a, b) => b.count - a.count);

  // Patterns
  const patternMatches = {};
  for (const g of [...Object.keys(directoryGroups), ...Object.keys(srcSubGroups)]) {
    if (dirLabel[g]) patternMatches[g] = dirLabel[g];
  }
  const filePatternMatches = {};
  for (const n of nodes) {
    const p = filePattern(n.filePath);
    if (p) filePatternMatches[n.id] = p;
  }

  // Deployment
  const paths = nodes.map((n) => n.filePath);
  const infraFiles = paths.filter((p) => /(^|\/)Dockerfile|docker-compose\.|\.tf$|\.tfvars$|^k8s\/|^\.github\/workflows\/|\.gitlab-ci\.yml$|Jenkinsfile|(^|\/)vercel\.json$|netlify\.toml$/.test(p));
  const deploymentTopology = {
    hasDockerfile: paths.some((p) => /(^|\/)Dockerfile/.test(p)),
    hasCompose: paths.some((p) => /docker-compose\./.test(p)),
    hasK8s: paths.some((p) => /(^|\/)(k8s|kubernetes|helm)\//.test(p)),
    hasTerraform: paths.some((p) => /\.tf$/.test(p)),
    hasCI: paths.some((p) => /^\.github\/workflows\/|\.gitlab-ci\.yml$|Jenkinsfile/.test(p)),
    infraFiles,
  };

  // Data pipeline
  const dataPipeline = {
    schemaFiles: paths.filter((p) => /\.(sql|graphql|gql|proto|prisma)$/.test(p) && !/migrations\//.test(p)),
    migrationFiles: paths.filter((p) => /migrations\//.test(p)),
    dataModelFiles: paths.filter((p) => /(^|\/)(models|data|entities|entity)\//.test(p)),
    apiHandlerFiles: paths.filter((p) => /(^|\/)(routes|api|controllers|handlers)\//.test(p)),
  };

  // Doc coverage
  const groups = Object.keys(directoryGroups);
  const docNodes = nodes.filter((n) => n.type === 'document');
  const documented = new Set();
  for (const e of allEdges) {
    if (e.type === 'documents' && typeOf[e.source] === 'document' && groupOf[e.target]) documented.add(groupOf[e.target]);
  }
  for (const d of docNodes) if (/README\.md$/i.test(d.filePath)) documented.add(groupOf[d.id]);
  const docCoverage = {
    groupsWithDocs: groups.filter((g) => documented.has(g)).length,
    totalGroups: groups.length,
    coverageRatio: groups.length ? +(groups.filter((g) => documented.has(g)).length / groups.length).toFixed(2) : 0,
    undocumentedGroups: groups.filter((g) => !documented.has(g)),
  };

  // Dependency direction, using src sub-groups for finer resolution
  const dependencyDirection = [];
  const seen = new Set();
  for (const { from, to, count } of srcSubGroupImports) {
    const key = [from, to].sort().join('\u0000');
    if (seen.has(key)) continue;
    seen.add(key);
    const back = subInter[to + '\u0000' + from] || 0;
    if (count > back) dependencyDirection.push({ dependent: from, dependsOn: to, forward: count, backward: back });
    else dependencyDirection.push({ dependent: from, dependsOn: to, forward: count, backward: back, mutual: true });
  }

  const nodeTypeCounts = Object.fromEntries(Object.entries(nodeTypeGroups).map(([k, v]) => [k, v.length]));
  const filesPerGroup = Object.fromEntries(Object.entries(directoryGroups).map(([k, v]) => [k, v.length]));

  fs.writeFileSync(outPath, JSON.stringify({
    scriptCompleted: true,
    commonPrefix: prefix.join('/'),
    directoryGroups,
    srcSubGroups,
    nodeTypeGroups,
    crossCategoryEdges,
    interGroupImports,
    srcSubGroupImports,
    intraGroupDensity,
    patternMatches,
    filePatternMatches,
    deploymentTopology,
    dataPipeline,
    docCoverage,
    dependencyDirection,
    fileStats: { totalFileNodes: nodes.length, filesPerGroup, nodeTypeCounts },
    fileFanIn,
    fileFanOut,
  }, null, 2));
}

try {
  main();
} catch (err) {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
}
