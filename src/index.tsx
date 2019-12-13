import React, { useEffect, useRef, useCallback, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import Spline from "./lib/Spline";
import SVGComponent from "./lib/SVGComponent";
import Node from "./lib/Node";
import { NodeType, Data, Position, Field } from './types';
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
  onNodeStartMove: (nid: number,) => void;
  onNodeMove: (nid: number, position: Position) => void;
  onNodeSelect: (nid: number,) => void;
  onNodeDeselect: (nid: number,) => void;
  onNewConnector: (fromNid: number, fromPinName:string, toNid: number, toPinName:string) => void;
  onRemoveConnector: (nid: number,) => void;
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
  const [state, setState] = useState({
    data,
    mousePos: {x: 0, y: 0},
    source: [] as number[],
    dragging: false
  });
  const svgRef = useRef() as React.MutableRefObject<SVGElement>;

  useEffect(() => {
    setState({
      ...state,
      data
    });
  }, [data]);

  useEffect(() => {
    function handleMouseUp() {
      setState({ ...state,dragging: false });
    }

    function handleMouseMove(e: MouseEvent) {
      e.stopPropagation();
      e.preventDefault();

      //Get svg element position to substract offset top and left
      const svgRect = svgRef.current.getBoundingClientRect();

      setState({
        ...state,
        mousePos: {
          x: e.pageX - svgRect.left,
          y: e.pageY - svgRect.top
        }
      });
    }

    document.addEventListener("mousemove", handleMouseUp);
    document.addEventListener("mouseup", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseUp);
      document.removeEventListener("mouseup", handleMouseMove);
    };
  }, []);

  const handleNodeStart = useCallback(
    nid => {
      onNodeStartMove(nid);
    },
    [onNodeStartMove]
  );

  const handleNodeStop = useCallback(
    (nid, pos) => {
      onNodeMove(nid, pos);
    },
    [onNodeMove]
  );

  const handleNodeMove = useCallback(
    (nodeIndex, pos) => {
      let d = cloneDeep(state.data);

      d.nodes[nodeIndex].x = pos.left;
      d.nodes[nodeIndex].y = pos.top;

      setState({ ...state,data: d });
    },
    [state.data]
  );

  const handleStartConnector = useCallback((nid, outputIndex) => {
    setState({ ...state, dragging: true, source: [nid, outputIndex] });
  }, []);

  const handleCompleteConnector = useCallback(
    (nid, inputIndex) => {
      if (state.dragging) {
        let nodes = state.data.nodes;
        let fromNode = getNodebyId(nodes, state.source[0]);
        let toNode = getNodebyId(nodes, nid);
        if(fromNode && toNode){
          let fromPinName = fromNode && fromNode.fields.out[state.source[1]].name;
          let toPinName = toNode.fields.in[inputIndex].name;
          onNewConnector(fromNode.nid, fromPinName, toNode.nid, toPinName);
        }

      }
      setState({ ...state, dragging: false });
    },
    [state, onNewConnector]
  );

  const handleRemoveConnector = useCallback(
    connector => {
      if (onRemoveConnector) {
        onRemoveConnector(connector);
      }
    },
    [onRemoveConnector]
  );

  const handleNodeSelect = useCallback(
    nid => {
      if (onNodeSelect) {
        onNodeSelect(nid);
      }
    },
    [onNodeSelect]
  );

  const handleNodeDeselect = useCallback(
    nid => {
      if (onNodeDeselect) {
        onNodeDeselect(nid);
      }
    },
    [onNodeDeselect]
  );

  const computePinIndexfromLabel = useCallback((pins: Field[], pinLabel: string) => {
    let reval = 0;

    for (let pin of pins) {
      if (pin.name === pinLabel) {
        return reval;
      } else {
        reval++;
      }
    }
  }, []);

  const renderComponents = () => {
    let nodes = state.data.nodes;
    let connectors = state.data.connections;
    let { mousePos, dragging } = state;

    let newConnector = null;

    if (dragging) {
      let sourceNode = getNodebyId(nodes, state.source[0]);
      if(sourceNode){
        let connectorStart = computeOutOffsetByIndex(
          sourceNode.x,
          sourceNode.y,
          state.source[1]
        );
        let connectorEnd = { x: state.mousePos.x, y: state.mousePos.y };
  
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
          {connectors.map((connector, spineIndex) => {
            const fromNode = getNodebyId(nodes, connector.from_node);
            const toNode = getNodebyId(nodes, connector.to_node);
            if(fromNode && toNode){
              const startPinIndex = computePinIndexfromLabel(fromNode.fields.out, connector.from)
              const endPinIndex = computePinIndexfromLabel(toNode.fields.in, connector.to)
              if(typeof startPinIndex === "number" && typeof endPinIndex === "number"){
                const splinestart = computeOutOffsetByIndex(
                  fromNode.x,
                  fromNode.y,
                  startPinIndex
                );
                const splineend = computeInOffsetByIndex(
                  toNode.x,
                  toNode.y,
                  endPinIndex
                );
                return (
                  <Spline
                    start={splinestart}
                    end={splineend}
                    key={spineIndex}
                    mousePos={mousePos}
                    onRemove={() => handleRemoveConnector(connector)}
                  />
                );
              }
            } 
            return null
          })}

          {/* this is our new connector that only appears on dragging */}
          {newConnector}
        </SVGComponent>
      </div>
    );
  };
  return renderComponents();
};

export default React.memo(ReactNodeGraph);
