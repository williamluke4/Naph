import { DMMF } from "@prisma/generator-helper";
import { Connection, NodeType } from "./types";

export function parseConnections(datamodel: DMMF.Datamodel) {
  const loadedRelations: string[] = [];
  const connections: Connection[] = [];

  datamodel.models.forEach((model: DMMF.Model, i: number) => {
    model.fields.forEach((field: DMMF.Field, fieldIdx: number) => {
      if (
        (field.kind as any) === "object" &&
        field.relationName &&
        !loadedRelations.includes(field.relationName)
      ) {
        loadedRelations.push(field.relationName);
        const from_model_idx = i;
        const from_field_idx = fieldIdx;
        const to_model_idx = datamodel.models.findIndex(
          (m) => m.name === field.type
        );
        const to_model = datamodel.models[to_model_idx];
        const to_field_idx = to_model.fields.findIndex(
          (f) => field.relationName === f.relationName && f.name !== field.name
        );
        if (to_model_idx !== -1)
          connections.push({
            from_node_id: from_model_idx,
            to_node_id: to_model_idx,
            from_field_name:
              datamodel.models[from_model_idx].fields[from_field_idx].name,
            to_field_name: to_model.fields[to_field_idx].name,
          });
      }
    });
  });
  return connections;
}

export function getFieldType(field: DMMF.Field){
  const typename = field.type
  const isList = field.isList ? '[ ]' : ''
  const isRequired = field.isRequired ? '' : '?'
  return typename + isRequired + isList;
}
export function parseModels(datamodel: DMMF.Datamodel): NodeType[] {
  const nodes: NodeType[] = [];
  datamodel.models.forEach((model,idx) => {
    nodes.push({
      nid: idx,
      model: model,
      title: model.name,
      fields: model.fields.map(field => {
        return {
          name: field.name,
          type: getFieldType(field),
        }
      }),
      x: 50,
      y: 50
    })
  })
  return nodes;
}
