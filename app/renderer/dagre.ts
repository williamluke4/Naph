import * as dagre from "dagre";
import { Connection, NodeType } from "./types";
const padding = 10;
const getHeight = (node: NodeType) =>
  node.fields.length * 20 + padding * 2 + 30;

const type = ["LR", "RL", "TB", "BT"];
let selection = 0;
export function autolayout(
  models: NodeType[],
  connections: Connection[],
  toggle = false
) {
  const updatedModels = [...models]
  const g = new dagre.graphlib.Graph();

  // Set an object for the graph label
  g.setGraph({
    rankdir: type[selection],
    // ranker: 'longest-path'
  });

  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(function () {
    return {};
  });

  models.forEach((model, i) => {
    g.setNode(i.toString(), {
      label: model.model.name,
      width: 200,
      height: getHeight(model),
    });
  });
  connections.forEach((conn, i) => {
    g.setEdge(conn.from_node_id.toString(), conn.to_node_id.toString());
  });
  dagre.layout(g);
  g.nodes().forEach((v) => {
    const node = g.node(v);
    updatedModels[parseInt(v)].x = node.x;
    updatedModels[parseInt(v)].y = node.y;

  });
  const graph = g.graph();
  if (toggle) {
    if (selection === 4) {
      selection = 0;
    } else {
      selection += 1;
    }
  }
  return updatedModels;
  // return { width: graph.width, height: graph.height };
}
