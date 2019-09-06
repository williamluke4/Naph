import React, {useState, useCallback} from 'react';

const NodeInputListItem = ({
                               index,
                               onMouseUp,
                               item,
                           }) => {
    const [isHover, setHover] = useState(false);

    const handleMouseUp = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();

        onMouseUp(index);
    }, [index, onMouseUp]);

    const handleMouseOver = useCallback(() => {
        setHover(true);
    }, []);

    const handleMouseOut = useCallback(() => {
        setHover(false);
    }, []);

    const noop = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
    }, []);

    return (
        <li>
            <a onClick={noop} onMouseUp={handleMouseUp} href="#">
                <i
                    className={isHover ? 'fa fa-circle-o hover' : 'fa fa-circle-o'}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                />
                {item.name}
            </a>
        </li>
    );
};

export default React.memo(NodeInputListItem);
