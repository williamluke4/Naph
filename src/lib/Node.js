import React, {useState, useCallback, useMemo} from 'react';
import onClickOutside from 'react-onclickoutside';
import Draggable from 'react-draggable';

import NodeInputList from './NodeInputList';
import NodeOutputList from './NodeOutputList';

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
                  index: propIndex,
              }) => {
    const [isSelected, setSelected] = useState(false);

    const handleDragStart = useCallback((event, ui) => {
        onNodeStart(nid, ui);
    }, [nid, onNodeStart]);

    const handleDragStop = useCallback((event, ui) => {
        onNodeStop(nid, ui.position);
    }, [nid, onNodeStop]);

    const handleDrag = useCallback((event, ui) => {
        onNodeMove(propIndex, ui.position);
    }, [onNodeMove, propIndex]);

    const handleStartConnector = useCallback((index) => {
        onStartConnector(nid, index);
    }, [nid, onStartConnector]);

    const handleCompleteConnector = useCallback((index) => {
        onCompleteConnector(nid, index);
    }, [nid, onCompleteConnector]);

    const handleClick = useCallback(() => {
        setSelected(true);
        if (onNodeSelect) {
            onNodeSelect(nid);
        }
    }, [nid, onNodeSelect]);

    Node.handleClickOutside = useCallback(() => {
        if (onNodeDeselect && selected) {
            onNodeDeselect(nid);
        }
        setSelected(false);
    }, [nid, selected, onNodeDeselect]);

    const nodeClass = useMemo(() => (
        'node' + (selected ? ' selected' : '')
    ), [selected]);

    return (
        <div onDoubleClick={handleClick}>
            <Draggable
                start={{x: pos.x, y: pos.y}}
                handle=".node-header"
                onStart={handleDragStart}
                onStop={handleDragStop}
                onDrag={handleDrag}>
                <section className={nodeClass} style={{zIndex: 10000}}>
                    <header className="node-header">
                        <span className="node-title">
                          {title}
                        </span>
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

const clickOutsideConfig = {
  handleClickOutside: () => Node.handleClickOutside
};

export default onClickOutside(Node, clickOutsideConfig);
