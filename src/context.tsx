import * as React from 'react'
import { Data, Position, Connection, NodeType } from './types'


interface NaphProviderStore {

  connections: Connection[];
  setConnections: React.Dispatch<React.SetStateAction<Connection[]>>
  addConnector: (Connection: Connection) => void;
  removeConnector: (Connection: Connection) => void;
  nodes: NodeType[];
  setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>
  mousePos: Position;
  setMousePos: React.Dispatch<React.SetStateAction<Position>>
  source: number[];
  setSource: React.Dispatch<React.SetStateAction<number[]>>
  dragging: boolean;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>
}

interface NaphProviderProps {
  data: Data;
}
export const NaphContext = React.createContext({} as NaphProviderStore)
export const NaphProvider: React.FC<NaphProviderProps> = (props) => {
  const [connections, setConnections] = React.useState(props.data.connections);
  const [nodes, setNodes] = React.useState(props.data.nodes);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [source, setSource] = React.useState([] as number[]);
  const [dragging, setDragging] = React.useState(false);

  function addConnector(connection: Connection) {
    let _connections = [...connections, connection]
    setConnections(_connections)
  }

  function removeConnector(connector: Connection) {
    let _connections = [...connections]
    _connections = connections.filter((connection) => {
      return connection != connector
    })

    setConnections(_connections)
  }

  React.useEffect(() => {
    setConnections(props.data.connections)
    setNodes(props.data.nodes)
  }, [props.data]);
  const store = {
    addConnector,
    removeConnector,
    connections, setConnections,
    nodes, setNodes,
    mousePos, setMousePos,
    source, setSource,
    dragging, setDragging,
  }
  return (
    <NaphContext.Provider value={store}>
        {props.children}
    </NaphContext.Provider>
  )
}