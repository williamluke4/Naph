import React, { useState, useCallback } from "react";
import { Field } from "../types";
interface NodeFieldProps {
    onMouseUp: (field: Field) => void;
    onMouseDown: (field: Field) => void;
    field: Field;
}
const NodeField = ({ onMouseUp, onMouseDown, field }: NodeFieldProps) => {
  const [isHover, setHover] = useState(false);

  const handleMouseUp = (e: any) => {
    noop(e)
    onMouseUp(field);
  }

  const handleMouseOver = () => {
    setHover(true);
  }

  const handleMouseOut = () => {
    setHover(false);
  }
  const handleMouseDown = (e: any) => {
    noop(e)
    onMouseDown(field);
  }
  const noop = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  }
  return (
    <div style={{width: '100%', height: '20px', display: 'grid', gridTemplateColumns: "1fr 1fr"}}>
      <div onClick={noop} onMouseUp={handleMouseUp}>
        {field.name}
      </div>
      <div style={{marginLeft: 'auto', color: '#808080'}} onClick={noop} onMouseDown={handleMouseDown}>
        {field.type}
      </div>
    </div>
  );
};

export default React.memo(NodeField);
