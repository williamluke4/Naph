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
  onNewConnector: (
    fromNid: number,
    fromPinName: string,
    toNid: number,
    toPinName: string
  ) => void;
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

  const handleStartConnector = (nid: number, outputIndex: number) => {
    naphContext.setDragging(true);
    naphContext.setSource([nid, outputIndex]);
  };

  const handleCompleteConnector = (nid: number, inputIndex: number) => {
    if (naphContext.dragging) {
      let nodes = naphContext.nodes;
      let fromNode = getNodebyId(nodes, naphContext.source[0]);
      let toNode = getNodebyId(nodes, nid);
      if (fromNode && toNode) {
        let fromPinName = fromNode && fromNode.fields.out[naphContext.source[1]].name;
        let toPinName = toNode.fields.in[inputIndex].name;
        naphContext.addConnector({
          from: fromPinName,
          from_node: fromNode.nid,
          to: toPinName,
          to_node: toNode.nid
        })
        onNewConnector(fromNode.nid, fromPinName, toNode.nid, toPinName);
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

  const computePinIndexfromLabel = (pins: Field[], pinLabel: string) => {
    let reval = 0;

    for (let pin of pins) {
      if (pin.name === pinLabel) {
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
      let sourceNode = getNodebyId(nodes, naphContext.source[0]);
      if (sourceNode) {
        let connectorStart = computeOutOffsetByIndex(
          sourceNode.x,
          sourceNode.y,
          naphContext.source[1]
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
              title={node.type}
              inputs={node.fields.in}
              outputs={node.fields.out}
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
            const fromNode = getNodebyId(nodes, connector.from_node);
            const toNode = getNodebyId(nodes, connector.to_node);
            if (fromNode && toNode) {
              const startPinIndex = computePinIndexfromLabel(
                fromNode.fields.out,
                connector.from
              );
              const endPinIndex = computePinIndexfromLabel(
                toNode.fields.in,
                connector.to
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
