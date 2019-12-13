import React, { useState, useCallback, useMemo, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Position, Item } from '../types';
import NodeInputList from "./NodeInputList";
import NodeOutputList from "./NodeOutputList";
import useClickAway from "../hooks/useClickAway";
interface NodeProps {
    nid: number;
    pos: Position;
    title: string;
    inputs: Item[];
    outputs: Item[];
    onNodeStart: (nid: number, ui: DraggableData) => void;
    onNodeStop: (nid: number, position: Position) => void;
    onNodeMove: (nid: number, position: Position) => void;
    onNodeSelect: (nid: number) => void;
    onNodeDeselect: (nid: number) => void;
    onStartConnector: (nid: number, index: number) => void;
    onCompleteConnector: (nid: number, index: number) => void;
    index: number;
}
const Node = ({
  nid,
  pos,
  title,
  inputs,
  outputs,
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

  const handleStartConnector = (index: number) => {
      onStartConnector(nid, index);
  }

  const handleCompleteConnector = (index: number) => {
    onCompleteConnector(nid, index);
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
  


  const nodeClass = useMemo(() => "node" + (isSelected ? " selected" : ""), [
    isSelected
  ]);

  return (
    <div onDoubleClick={handleClick} ref={ref}>
      <Draggable
        defaultPosition={{ x: pos.x, y: pos.y }}
        handle=".node-header"
        onStart={handleDragStart}
        onStop={handleDragStop}
        onDrag={handleDrag}
      >
        <section className={nodeClass} style={{ zIndex: 10000 }}>
          <header className="node-header">
            <span className="node-title">{title}</span>
          </header>
          <div className="node-content">
            <NodeInputList
              items={inputs}
              onCompleteConnector={handleCompleteConnector}
            />
            <NodeOutputList
              items={outputs}
              onStartConnector={handleStartConnector}
            />
          </div>
        </section>
      </Draggable>
    </div>
  );
};


export default Node;
