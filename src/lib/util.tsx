import { useState } from "react";
import { Position } from "../types";

/* not bound to style, should be computed */
export function computeInOffsetByIndex(x: number, y: number, index: number) {
  let outx = x + 15;
  let outy = y + 47 + index * 20;

  return { x: outx, y: outy };
}

export function computeOutOffsetByIndex(x: number, y: number, index: number) {
  let outx = x + 166;
  let outy = y + 49 + index * 22;

  return { x: outx, y: outy };
}

export function useObjectState<T>(initialState: T) {
  const [state, setState] = useState(initialState);
  function setSafeState(
    newState: Partial<T> | ((prev:T) => Partial<T>),
    callback?: () => void
  ){
    if (typeof newState === "function") {
      setState(prevState => ({
        ...prevState,
        ...newState(prevState)
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        ...newState
      }));
    }

    if (callback) {
      callback();
    }
  };
  return [state, setSafeState];
}
