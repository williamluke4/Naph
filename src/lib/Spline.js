import React, {useState, useCallback, useMemo} from 'react';
import onClickOutside from 'react-onclickoutside';

import {useObjectState} from './util';
import TrashIcon from './TrashIcon';

const bezierCurve = (a, b, cp1x, cp1y, cp2x, cp2y, x, y) => {
    return `M${a},${b} C${cp1x},${cp1y} ${cp2x},${cp2y}  ${x},${y}`;
};

const distance = (a, b) => {
    return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
};

const Spline = ({
                    mousePos,
                    onClick,
                    onClickOutside: onClickOutsideFromProps,
                    onRemove,
                    start,
                    end,
                }) => {
    const [selected, setSelected] = useState(false);
    const [position, setPosition] = useObjectState({x: 0, y: 0});

    const handleClick = useCallback((e) => {
        setSelected(!selected);
        setPosition(mousePos);
        if (onClick) {
            onClick(e);
        }
    }, [selected, mousePos, onClick]);

    const handleClickOutside = useCallback((e) => {
        setSelected(false);

        if (onClickOutsideFromProps) {
            onClickOutsideFromProps(e);
        }
    }, [onClickOutsideFromProps]);

    const handleRemove = useCallback((e) => {
        setSelected(false);

        if (onRemove) {
            onRemove(e);
        }
    }, [onRemove]);


    const dist = useMemo(() => (
        distance([start.x, start.y], [end.x, end.y])
    ), [start, end]);

    const pathString = useMemo(() => (
        bezierCurve(start.x,                  // start x
            start.y,                  // start y
            start.x + dist * 0.25,    // cp1 x
            start.y,                  // cp1 y
            end.x - dist * 0.75,     // cp2 x
            end.y,                    // cp2 y
            end.x,                   // end x
            end.y)                   // end y
    ), [start, end]);

    const className = useMemo(() => (
        'connector' + (selected ? ' selected' : '')
    ), [selected]);

    return (
        <g>
            <circle cx={start.x} cy={start.y} r="3" fill="#337ab7"/>
            <circle cx={end.x} cy={end.y} r="3" fill="#9191A8"/>
            <path className="connector-click-area" d={pathString} onClick={handleClick}/>
            <path className={className} d={pathString} onClick={handleClick}/>
            {
                selected && (
                    <TrashIcon
                        position={position}
                        onClick={handleRemove}
                    />
                )
            }
        </g>
    )
};

export default onClickOutside(Spline)
