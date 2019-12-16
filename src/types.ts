export type Position = {
  x: number;
  y: number;
}



export interface Data {
  nodes: NodeType[];
  connections: Connection[];
}

export interface Connection {
  from_node: number;
  from_field: Field;
  to_node: number;
  to_field: Field;
}

export interface NodeType {
  nid: number;
  title: string;
  x: number;
  y: number;
  fields: Field[];
}

export interface Field {
  name: string;
  type: string;
}