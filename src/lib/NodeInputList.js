import React, {useCallback} from 'react';

import NodeInputListItem from './NodeInputListItem';

const NodeInputList = ({
                           onCompleteConnector,
                           items
                       }) => {
    const handleMouseUp = useCallback((i) => {
        onCompleteConnector(i);
    }, [onCompleteConnector]);

    return (
        <div className="nodeInputWrapper">
            <ul className="nodeInputList">
                {
                    items.map((item, index) => (
                        <NodeInputListItem
                            onMouseUp={handleMouseUp}
                            key={index}
                            index={index + 1}
                            item={item}
                        />
                    ))
                }
            </ul>
        </div>
    );
};

export default React.memo(NodeInputList);
