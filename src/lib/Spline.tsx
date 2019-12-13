import React, { useState, useCallback, useMemo, useRef } from "react";
import { Position } from '../types';
import { useObjectState } from "./util";
import TrashIcon from "./TrashIcon";
import useOutsideClick from "../hooks/useOutsideClick";

const bezierCurve = (a:number, b:number, cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number) => {
  const curve = `M${a},${b} C${cp1x},${cp1y} ${cp2x},${cp2y}  ${x},${y}`;
  return curve;
};

const distance = (a: Position, b: Position) => {
  const dist =  Math.sqrt(
    (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)
  );
  
  return dist ? dist : 0;
};
interface SplineProps {
    mousePos?: Position;
    onClick?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
    onRemove?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
    start: Position;
    end: Position;
}
const Spline = ({
  mousePos,
  onClick,
  onRemove,
  start,
  end
}: SplineProps) => {
  const [selected, setSelected] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const ref = useRef() as React.MutableRefObject<SVGGElement>;

  const handleClick = useCallback(
    e => {
      setSelected(!selected);
      mousePos && setPosition(mousePos);
      if (onClick) {
        onClick(e);
      }
    },
    [selected, mousePos, onClick]
  );


  useOutsideClick(ref, useCallback(
    e => {
      setSelected(false);
    },
    []
  ))
  const handleRemove = useCallback(
    e => {
      setSelected(false);

      if (onRemove) {
        onRemove(e);
      }
    },
    [onRemove]
  );

  const dist = useMemo(() => distance(start, end), [
    start,
    end
  ]);

  const pathString = useMemo(
    () =>
      bezierCurve(
        start.x || 0, // start x
        start.y|| 0, // start y
        (start.x + dist * 0.25) || 0, // cp1 x
        start.y|| 0, // cp1 y
        (end.x - dist * 0.75) || 0, // cp2 x
        end.y|| 0, // cp2 y
        end.x|| 0, // end x
        end.y|| 0
      ), // end y
    [start, end]
  );

  const className = useMemo(() => "connector" + (selected ? " selected" : ""), [
    selected
  ]);

  return (
    <g ref={ref}>
      <circle cx={start.x} cy={start.y} r="3" fill="#337ab7" />
      <circle cx={end.x} cy={end.y} r="3" fill="#9191A8" />
      <path
        className="connector-click-area"
        d={pathString}
        onClick={handleClick}
      />
      <path className={className} d={pathString} onClick={handleClick} />
      {selected && <TrashIcon position={position} onClick={handleRemove} />}
    </g>
  );
};

export default Spline;
