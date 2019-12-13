import React, { useCallback } from "react";

import NodeOutputListItem from "./NodeOutputListItem";
import { Item } from "../types";
interface NodeOutputListProps {
  onStartConnector: (index: number) => void;
  items: Item[];
}
const NodeOutputList = ({ onStartConnector, items }: NodeOutputListProps) => {
  const onMouseDown = useCallback(
    i => {
      onStartConnector(i);
    },
    [onStartConnector]
  );

  return (
    <div className="nodeOutputWrapper">
      <ul className="nodeOutputList">
        {items.map((item, index) => (
          <NodeOutputListItem
            key={index}
            onMouseDown={onMouseDown}
            index={index + 1}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(NodeOutputList);
