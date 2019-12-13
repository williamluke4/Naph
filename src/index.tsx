import React, { useEffect, useRef, useCallback, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import Spline from "./lib/Spline";
import SVGComponent from "./lib/SVGComponent";
import Node from "./lib/Node";
import { NodeType, Data, Position, Field, Connection } from "./types";
import {
  computeOutOffsetByIndex,
  computeInOffsetByIndex,
  useObjectState
} from "./lib/util";

const getNodebyId = (nodes: NodeType[], nid: number) => {
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
  data: Data;
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
  data,
  onNodeStartMove,
  onNodeMove,
  onNodeSelect,
  onNodeDeselect,
  onNewConnector,
  onRemoveConnector
}: ReactNodeGraphProps) => {
  const [sData, setData] = useState(data);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [source, setSource] = useState([] as number[]);
  const [dragging, setDragging] = useState(false);

  const svgRef = useRef() as React.MutableRefObject<SVGElement>;

  useEffect(() => {
    setData(data);
  }, [data]);

  useEffect(() => {
    function handleMouseUp() {
      setDragging(false);
    }

    function handleMouseMove(e: MouseEvent) {
      e.stopPropagation();
      e.preventDefault();

      //Get svg element position to substract offset top and left
      const svgRect = svgRef.current.getBoundingClientRect();

      setMousePos({
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
  const handleNodeStop = onNodeMove;

  const handleNodeMove = (nodeIndex: number, pos: Position) => {
    let d = cloneDeep(sData);

    d.nodes[nodeIndex].x = pos.x;
    d.nodes[nodeIndex].y = pos.y;

    setData(d);
  };

  const handleStartConnector = (nid: number, outputIndex: number) => {
    setDragging(true);
    setSource([nid, outputIndex]);
  };

  const handleCompleteConnector = (nid: number, inputIndex: number) => {
    if (dragging) {
      let nodes = sData.nodes;
      let fromNode = getNodebyId(nodes, source[0]);
      let toNode = getNodebyId(nodes, nid);
      if (fromNode && toNode) {
        let fromPinName = fromNode && fromNode.fields.out[source[1]].name;
        let toPinName = toNode.fields.in[inputIndex].name;
        onNewConnector(fromNode.nid, fromPinName, toNode.nid, toPinName);
      }
    }

    setDragging(false);
  };

  const handleRemoveConnector = (connector: Connection) => {
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
    let nodes = sData.nodes;
    let connectors = sData.connections;
    let newConnector = null;

    if (dragging) {
      let sourceNode = getNodebyId(nodes, source[0]);
      if (sourceNode) {
        let connectorStart = computeOutOffsetByIndex(
          sourceNode.x,
          sourceNode.y,
          source[1]
        );
        let connectorEnd = { x: mousePos.x, y: mousePos.y };

        newConnector = <Spline start={connectorStart} end={connectorEnd} />;
      }
    }

    return (
      <div className={dragging ? "dragging" : ""}>
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
          {connectors.map((connector, connectorIndex) => {
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
                    mousePos={mousePos}
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
export default React.memo(ReactNodeGraph);
