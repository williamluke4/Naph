import * as React from "react";
import { off, on } from "./util";

const defaultEvents = ["mousedown", "touchstart"];

export const useClickAway = (
  ref: React.RefObject<any | null>,
  onClickAway: (event: KeyboardEvent) => void,
  events: string[] = defaultEvents
) => {
  const savedCallback = React.useRef(onClickAway);
  React.useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);
  React.useEffect(() => {
    const handler = (event: any) => {
      const { current: el } = ref;
      el && !el.contains(event.target) && savedCallback.current(event);
    };
    for (const eventName of events) {
      on(document, eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        off(document, eventName, handler);
      }
    };
  }, [events, ref]);
};

export default useClickAway;
