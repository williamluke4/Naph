import React, { useState, useCallback, useMemo, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Position, Field } from '../types';
import useClickAway from "../hooks/useClickAway";
import NodeFields from "./NodeFields";
interface NodeProps {
    nid: number;
    pos: Position;
    title: string;
    fields: Field[];
    onNodeStart: (nid: number, ui: DraggableData) => void;
    onNodeStop: (nid: number, position: Position) => void;
    onNodeMove: (nid: number, position: Position) => void;
    onNodeSelect: (nid: number) => void;
    onNodeDeselect: (nid: number) => void;
    onStartConnector: (nid: number, field: Field) => void;
    onCompleteConnector: (nid: number, field: Field) => void;
    index: number;
}
const Node = ({
  nid,
  pos,
  title,
  fields,
  onNodeStart,
  onNodeStop,
  onNodeMove,
  onNodeSelect,
  onNodeDeselect,
  onStartConnector,
  onCompleteConnector,
  index: propIndex
}: NodeProps) => {
  const [isSelected, setSelected] = useState(false);
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleDragStart =(event: DraggableEvent, ui: DraggableData) => {
      onNodeStart(nid, ui);
  }

  const handleDragStop = (event: DraggableEvent, ui: DraggableData) => {
    onNodeStop(nid,   {x:ui.x, y:ui.y});
  }
  const handleDrag = (event: DraggableEvent, ui: DraggableData) => {
    onNodeMove(propIndex, {x:ui.x, y:ui.y});
  }

  const handleStartConnector = (field: Field) => {
      onStartConnector(nid, field);
  }

  const handleCompleteConnector = (field: Field) => {
    onCompleteConnector(nid, field);
  }

  const handleClick = () => {
    setSelected(!isSelected);
    if (onNodeSelect) {
      onNodeSelect(nid);
    }
  }

  useClickAway(ref, () => {
    if (onNodeDeselect && isSelected) {
      onNodeDeselect(nid);
    }
    setSelected(false);
    })
  


  const NodeClass = useMemo(() => "node" + (isSelected ? " selected" : ""), [
    isSelected
  ]);

  return (
    <div onDoubleClick={handleClick} ref={ref}>
      <Draggable
        defaultPosition={{ x: pos.x, y: pos.y }}
        position={{x: pos.x, y: pos.y }}
        handle=".node-header"
        onStart={handleDragStart}
        onStop={handleDragStop}
        onDrag={handleDrag}
      >
        <section className={NodeClass} style={{ zIndex: 10000 }}>
          <header className="node-header">
            <span className="node-title">{title}</span>
          </header>
          <div className="node-content">
            <NodeFields 
              fields={fields}
              onCompleteConnector={handleCompleteConnector}
              onStartConnector={handleStartConnector}
            />
          </div>
        </section>
      </Draggable>
    </div>
  );
};


export default Node;
