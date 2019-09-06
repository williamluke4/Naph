import React, {useCallback} from 'react';

import NodeOutputListItem from './NodeOutputListItem';

const NodeOutputList = ({onStartConnector, items}) => {
    const onMouseDown = useCallback((i) => {
        onStartConnector(i);
    }, [onStartConnector]);

    return (
        <div className="nodeOutputWrapper">
            <ul className="nodeOutputList">
                {
                	items.map((item, index) => (
                        <NodeOutputListItem
							key={index}
							onMouseDown={onMouseDown}
							index={index + 1}
							item={item}
						/>
                    ))
                }
            </ul>
        </div>
    );
};

export default React.memo(NodeOutputList);
