import * as React from "react";
import useSWR from "swr";
import NaphGraph, {
  Connection,
  Data,
  NaphProvider,
  Position,
} from "./naph";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
import ClimbingBoxLoader from "react-spinners/ClipLoader";


export default () => {
  function onNewConnector(_connector: Connection) {
    // console.log("New Connector Added");
  }

  function onRemoveConnector(_connector: Connection) {
    // console.log("Connector Removed");
  }

  function onNodeMove(_nid: number, _pos: Position) {
    // console.log('end move : ' + nid, pos)
  }

  function onNodeStartMove(_nid: number) {
    // console.log('start move : ' + nid)
  }

  function handleNodeSelect(_nid: number) {
    // console.log('node selected : ' + nid)
  }

  function handleNodeDeselect(_nid: number) {
    // console.log('node deselected : ' + nid)
  }
  const { data, error } = useSWR("http://localhost:3000/datamodel", fetcher);
  const datamodel = data
  React.useEffect(() => {
    console.log(datamodel);
  }, [datamodel]);
  if(datamodel){
    return (
      <NaphProvider datamodel={datamodel}>
        <NaphGraph
          onNodeMove={(nid, pos) => onNodeMove(nid, pos)}
          onNodeStartMove={(nid) => onNodeStartMove(nid)}
          onNewConnector={(connector) => onNewConnector(connector)}
          onRemoveConnector={(connector) => onRemoveConnector(connector)}
          onNodeSelect={(nid) => {
            handleNodeSelect(nid);
          }}
          onNodeDeselect={(nid) => {
            handleNodeDeselect(nid);
          }}
        />
      </NaphProvider>
    );
  } else {
    return <ClimbingBoxLoader/>
  }
};
