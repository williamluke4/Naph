export type Position = {
  x: number;
  y: number;
}

export type Item = {
  name: string;
}
// export type NodeType = {
//   index: number
//   nid: number
//   title: string;
//   inputs: Item[];
//   outputs:Item[];
//   pos: Position;
//   key: number;
// }

export interface Data {
  nodes: NodeType[];
  connections: Connection[];
}

export interface Connection {
  from_node: number;
  from: string;
  to_node: number;
  to: string;
}

export interface NodeType {
  nid: number;
  type: string;
  x: number;
  y: number;
  fields: Fields;
}

export interface Fields {
  in: Field[];
  out: Field[];
}

export interface Field {
  name: string;
}