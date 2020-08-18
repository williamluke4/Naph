import React, { useEffect, useRef, useCallback, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import Spline from "./lib/Spline";
import SVGComponent from "./lib/SVGComponent";
import Node from "./lib/Node";
import { NodeType, Data, Position, Field, Connection } from "./types";

import {
  computeOutOffsetByIndex,
  computeInOffsetByIndex,
} from "./lib/util";
import { NaphContext } from "./context";

export const getNodebyId = (nodes: NodeType[], nid: number) => {
  let reval = 0;

  for (let node of nodes) {
    if (node.nid === nid) {
      return nodes[reval];
    } else {
      reval++;
    }
  }
};
interface ReactNodeGraphProps {
  onNodeStartMove: (nid: number) => void;
  onNodeMove: (nid: number, position: Position) => void;
  onNodeSelect: (nid: number) => void;
  onNodeDeselect: (nid: number) => void;
  onNewConnector: (connector: Connection) => void;
  onRemoveConnector: (connector: Connection) => void;
}
const ReactNodeGraph = ({
  onNodeStartMove,
  onNodeMove,
  onNodeSelect,
  onNodeDeselect,
  onNewConnector,
  onRemoveConnector
}: ReactNodeGraphProps) => {
  const naphContext = React.useContext(NaphContext);
  const svgRef = useRef() as React.MutableRefObject<SVGElement>;
  useEffect(() => {
    function handleMouseUp() {
      naphContext.setDragging(false);
    }

    function handleMouseMove(e: MouseEvent) {
      e.stopPropagation();
      e.preventDefault();

      //Get svg element position to substract offset top and left
      const svgRect = svgRef.current.getBoundingClientRect();

      naphContext.setMousePos({
        x: e.pageX - svgRect.left,
        y: e.pageY - svgRect.top
      });
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseUp);
      document.removeEventListener("mouseup", handleMouseMove);
    };
  }, []);

  const handleNodeStart = onNodeStartMove;
  const handleNodeStop = () => null;
  //onNodeStop;

  const handleNodeMove = (nodeIndex: number, pos: Position) => {
    let nodes = cloneDeep(naphContext.nodes);

    nodes[nodeIndex].x = pos.x;
    nodes[nodeIndex].y = pos.y;
    onNodeMove(nodeIndex, pos)
    naphContext.setNodes(nodes);
  };

  const handleStartConnector = (nid: number, outputField: Field) => {
    naphContext.setDragging(true);
    naphContext.setSource({nid, field:outputField});
  };

  const handleCompleteConnector = (nid: number, field: Field) => {
    if (naphContext.dragging) {
      let nodes = naphContext.nodes;
      let fromNode = getNodebyId(nodes, naphContext.source.nid);
      let toNode = getNodebyId(nodes, nid);
      if (fromNode && toNode) {
        const newConnector = {
          from_field_name: naphContext.source.field.name,
          from_node_id: fromNode.nid,
          to_field_name: field.name,
          to_node_id: toNode.nid
        }
        naphContext.addConnector(newConnector)
        onNewConnector(newConnector);
      }
    }

    naphContext.setDragging(false);
  };

  const handleRemoveConnector = (connector: Connection) => {
    naphContext.removeConnector(connector)
    if (onRemoveConnector) {
      onRemoveConnector(connector);
    }
  };

  const handleNodeSelect = (nid: number) => {
    if (onNodeSelect) {
      onNodeSelect(nid);
    }
  };

  const handleNodeDeselect = (nid: number) => {
    if (onNodeDeselect) {
      onNodeDeselect(nid);
    }
  };

  const computeFieldIndexfromFieldName = (fields: Field[], field_name: string) => {
    let reval = 0;

    for (let f of fields) {
      if (f.name === field_name) {
        return reval;
      } else {
        reval++;
      }
    }
  };

  const renderComponents = () => {
    let nodes = naphContext.nodes;
    let newConnector = null;

    if (naphContext.dragging) {
      let sourceNode = getNodebyId(nodes, naphContext.source.nid);
      if (sourceNode) {
        let connectorStart = computeOutOffsetByIndex(
          sourceNode.x,
          sourceNode.y,
          sourceNode.fields.findIndex(f => f.name === naphContext.source.field.name)
        );
        let connectorEnd = naphContext.mousePos;

        newConnector = <Spline start={connectorStart} end={connectorEnd} />;
      }
    }

    return (
      <div className={naphContext.dragging ? "dragging" : ""}>
        {nodes.map((node, i) => {
          return (
            <Node
              index={i}
              nid={node.nid}
              title={node.title}
              fields={node.fields}
              pos={{ x: node.x, y: node.y }}
              key={node.nid}
              onNodeStart={handleNodeStart}
              onNodeStop={handleNodeStop}
              onNodeMove={handleNodeMove}
              onStartConnector={handleStartConnector}
              onCompleteConnector={handleCompleteConnector}
              onNodeSelect={handleNodeSelect}
              onNodeDeselect={handleNodeDeselect}
            />
          );
        })}

        {/* render our connectors */}

        <SVGComponent height="100%" width="100%" childRef={svgRef}>
          {naphContext.connections.map((connector, connectorIndex) => {
            const fromNode = getNodebyId(nodes, connector.from_node_id);
            const toNode = getNodebyId(nodes, connector.to_node_id);

            if (fromNode && toNode) {
              const startPinIndex = computeFieldIndexfromFieldName(
                fromNode.fields,
                connector.from_field_name
              );
              const endPinIndex = computeFieldIndexfromFieldName(
                toNode.fields,
                connector.to_field_name
                );
              if (
                typeof startPinIndex === "number" &&
                typeof endPinIndex === "number"
              ) {
                const splineStart = computeOutOffsetByIndex(
                  fromNode.x,
                  fromNode.y,
                  startPinIndex
                );
                const splineEnd = computeInOffsetByIndex(
                  toNode.x,
                  toNode.y,
                  endPinIndex
                );
                return (
                  <Spline
                    start={splineStart}
                    end={splineEnd}
                    key={connectorIndex}
                    mousePos={naphContext.mousePos}
                    onRemove={() => handleRemoveConnector(connector)}
                  />
                );
              }
            }
            return null;
          })}

          {/* this is our new connector that only appears on dragging */}
          {newConnector}
        </SVGComponent>
      </div>
    );
  };
  return renderComponents();
};
export * from './types';
export * from './context';

export default React.memo(ReactNodeGraph);
