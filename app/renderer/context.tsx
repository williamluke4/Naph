import { DMMF } from "@prisma/generator-helper";
import * as React from "react";
import { autolayout } from "./dagre";
import { parseConnections, parseModels } from "./helpers";
import { Connection, Field, NodeType, Position } from "./types";

interface NaphProviderStore {
  connections: Connection[];
  setConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
  addConnector: (Connection: Connection) => void;
  removeConnector: (Connection: Connection) => void;
  nodes: NodeType[];
  setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>;
  mousePos: Position;
  setMousePos: React.Dispatch<React.SetStateAction<Position>>;
  source: {
    nid: number;
    field: Field;
  };
  setSource: React.Dispatch<
    React.SetStateAction<{
      nid: number;
      field: Field;
    }>
  >;
  dragging: boolean;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NaphProviderProps {
  datamodel: DMMF.Datamodel;
}
export const NaphContext = React.createContext({} as NaphProviderStore);
export const NaphProvider: React.FC<NaphProviderProps> = (props) => {
  const [connections, setConnections] = React.useState(
    parseConnections(props.datamodel)
  );
  const [nodes, setNodes] = React.useState(parseModels(props.datamodel));
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [source, setSource] = React.useState({} as NaphProviderStore["source"]);
  const [dragging, setDragging] = React.useState(false);

  function addConnector(connection: Connection) {
    let _connections = [...connections, connection];
    setConnections(_connections);
  }

  function removeConnector(connector: Connection) {
    let _connections = [...connections];
    _connections = connections.filter((connection) => {
      return connection != connector;
    });

    setConnections(_connections);
  }

  React.useEffect(() => {
    const connections = parseConnections(props.datamodel);
    const nodes = parseModels(props.datamodel);
    const models = autolayout(nodes, connections);
    console.log(`Effect`);
    setNodes(models);
    setConnections(connections);
  }, [props.datamodel]);
  const store = {
    addConnector,
    removeConnector,
    connections,
    setConnections,
    nodes,
    setNodes,
    mousePos,
    setMousePos,
    source,
    setSource,
    dragging,
    setDragging,
  };
  return (
    <NaphContext.Provider value={store}>{props.children}</NaphContext.Provider>
  );
};
