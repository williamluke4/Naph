import React, {useEffect, useRef, useCallback} from 'react';
import cloneDeep from 'lodash.clonedeep';
import Node from './lib/Node';
import Spline from './lib/Spline';
import SVGComponent from './lib/SVGComponent';

import {computeOutOffsetByIndex, computeInOffsetByIndex, useObjectState} from './lib/util';

const getNodebyId = (nodes, nid) => {
    let reval = 0;

    for (let node of nodes) {
        if (node.nid === nid) {
            return nodes[reval];
        } else {
            reval++;
        }
    }
};

const index = ({
                   data,
                   onNodeStartMove,
                   onNodeMove,
                   onNodeSelect,
                   onNodeDeselect,
                   onNewConnector,
                   onRemoveConnector,
               }) => {
    const [state, setState] = useObjectState({
        data,
        source: [],
        dragging: false
    });
    const svgRef = useRef(null);

    useEffect(() => {
        setState({
            data,
        });
    }, [data]);

    useEffect(() => {
        function handleMouseUp() {
            setState({dragging: false,});
        }

        function handleMouseMove(e) {
            e.stopPropagation();
            e.preventDefault();

            const {svgComponent: {refs: {svg}}} = this.refs;

            //Get svg element position to substract offset top and left
            const svgRect = svg.getBoundingClientRect();

            setState({
                mousePos: {
                    x: e.pageX - svgRect.left,
                    y: e.pageY - svgRect.top
                }
            });
        }

        document.addEventListener('mousemove', handleMouseUp);
        document.addEventListener('mouseup', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseUp);
            document.removeEventListener('mouseup', handleMouseMove);
        }
    }, []);

    const handleNodeStart = useCallback((nid) => {
        onNodeStartMove(nid);
    }, [onNodeStartMove]);

    const handleNodeStop = useCallback((nid, pos) => {
        onNodeMove(nid, pos);
    }, [onNodeMove]);

    const handleNodeMove = useCallback((nodeIndex, pos) => {
        let d = cloneDeep(state.data);

        d.nodes[nodeIndex].x = pos.left;
        d.nodes[nodeIndex].y = pos.top;

        setState({data: d});
    }, [state.data]);

    const handleStartConnector = useCallback((nid, outputIndex) => {
        setState({dragging: true, source: [nid, outputIndex]});
    }, []);

    const handleCompleteConnector = useCallback((nid, inputIndex) => {
        if (state.dragging) {

            let nodes = state.data.nodes;
            let fromNode = getNodebyId(nodes, this.state.source[0]);
            let fromPinName = fromNode.fields.out[this.state.source[1]].name;
            let toNode = getNodebyId(nodes, nid);
            let toPinName = toNode.fields.in[inputIndex].name;

            onNewConnector(fromNode.nid, fromPinName, toNode.nid, toPinName);
        }
        setState({dragging: false});
    }, [state, onNewConnector]);

    const handleRemoveConnector = useCallback((connector) => {
        if (onRemoveConnector) {
            onRemoveConnector(connector);
        }
    }, [onRemoveConnector]);

    const handleNodeSelect = useCallback((nid) => {
        if (onNodeSelect) {
            onNodeSelect(nid);
        }
    }, [onNodeSelect]);

    const handleNodeDeselect = useCallback((nid) => {
        if (onNodeDeselect) {
            onNodeDeselect(nid);
        }
    }, [onNodeDeselect]);

    const computePinIndexfromLabel = useCallback((pins, pinLabel) => {
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
        let {mousePos, dragging} = state;

        let newConnector = null;

        if (dragging) {

            let sourceNode = getNodebyId(nodes, state.source[0]);
            let connectorStart = computeOutOffsetByIndex(sourceNode.x, sourceNode.y, state.source[1]);
            let connectorEnd = {x: state.mousePos.x, y: state.mousePos.y};

            newConnector = (
                <Spline
                    start={connectorStart}
                    end={connectorEnd}
                />
            )
        }

        return (
            <div className={dragging ? 'dragging' : ''}>
                {nodes.map((node, i) => {
                    return <Node
                        index={i}
                        nid={node.nid}
                        title={node.type}
                        inputs={node.fields.in}
                        outputs={node.fields.out}
                        pos={{x: node.x, y: node.y}}
                        key={node.nid}

                        onNodeStart={handleNodeStart}
                        onNodeStop={handleNodeStop}
                        onNodeMove={handleNodeMove}

                        onStartConnector={handleStartConnector}
                        onCompleteConnector={handleCompleteConnector}

                        onNodeSelect={handleNodeSelect}
                        onNodeDeselect={handleNodeDeselect}
                    />
                })}

                {/* render our connectors */}

                <SVGComponent height="100%" width="100%" ref={svgRef}>

                    {connectors.map((connector, spineIndex) => {
                        const fromNode = getNodebyId(nodes, connector.from_node);
                        const toNode = getNodebyId(nodes, connector.to_node);

                        const splinestart = computeOutOffsetByIndex(fromNode.x, fromNode.y, computePinIndexfromLabel(fromNode.fields.out, connector.from));
                        const splineend = computeInOffsetByIndex(toNode.x, toNode.y, computePinIndexfromLabel(toNode.fields.in, connector.to));

                        return (
                            <Spline
                                start={splinestart}
                                end={splineend}
                                key={spineIndex}
                                mousePos={mousePos}
                                onRemove={() => handleRemoveConnector(connector)}
                            />
                        )

                    })}

                    {/* this is our new connector that only appears on dragging */}
                    {newConnector}

                </SVGComponent>
            </div>
        );
    };
    return renderComponents();
};

export default React.memo(index);
