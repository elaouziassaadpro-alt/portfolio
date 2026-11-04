import { createBrain } from "./brainGeometry";

// Generates the brain off the main thread and hands back plain typed arrays.
self.onmessage = ({ data: options }) => {
  const { surfaces, nodes, edges, adjacency } = createBrain(options);
  const transfer = [];
  const take = (attribute) => {
    if (!attribute) return null;
    transfer.push(attribute.array.buffer);
    return attribute.array;
  };

  self.postMessage(
    {
      surfaces: surfaces.map((geometry) => ({
        position: take(geometry.attributes.position),
        normal: take(geometry.attributes.normal),
        color: take(geometry.attributes.color),
        index: take(geometry.index),
      })),
      nodes: nodes.map((node) => node.position.toArray()),
      edges: edges.map(({ a, b, control }) => ({ a, b, control: control.toArray() })),
      adjacency,
    },
    transfer
  );
};
