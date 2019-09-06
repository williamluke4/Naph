import React, {useCallback} from 'react';

const NodeOutputListItem = ({onMouseDown, index, item}) => {

    const handleMouseDown = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();

        onMouseDown(index);
    }, []);

    const noop = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
    }, []);

    return (
        <li onMouseDown={handleMouseDown}>
            <a href="#" onClick={noop}>
                {item.name}
                <i className="fa fa-circle-o"/>
            </a>
        </li>
    );
};

export default React.memo(NodeOutputListItem);
