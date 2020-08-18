import { DMMF } from '@prisma/generator-helper';

export type Position = {
  x: number;
  y: number;
}



export interface Data {
  nodes: NodeType[];
  connections: Connection[];
}

export interface Connection {
  from_node_id: number;
  from_field_name: string;
  to_node_id: number;
  to_field_name: string;
}

export interface NodeType {
  nid: number;
  title: string;
  model: DMMF.Model;
  x: number;
  y: number;
  fields: Field[];
}

export interface Field {
  name: string;
  type: string;
}