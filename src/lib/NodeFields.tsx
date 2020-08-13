import React, { useCallback } from "react";
import { Field } from "../types";
import NodeField from "./NodeField";
interface NodeFieldsProps {    
    onCompleteConnector: (field: Field) => void;
    onStartConnector: (field: Field) => void;
    fields: Field[];
}
const NodeFieldsList = ({ onCompleteConnector,onStartConnector, fields }: NodeFieldsProps) => {
  const handleMouseUp = (field: Field) => {
    onCompleteConnector(field);
  }
  const handleMouseDown = (field: Field) => {
    onStartConnector(field);
  }
  return (
    <div style={{width: "100%"}}>
      {fields.map((field, index) => (
        <NodeField
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          key={index}
          field={field}
        />
      ))}
    </div>
  );
};

export default React.memo(NodeFieldsList);