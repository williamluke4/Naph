import * as React from 'react';

import NaphGraph, { NaphContext, NaphProvider } from '../src';
import { Data, Connection, NodeType } from '../src/types';
var exampleGraph: Data = {
  "nodes":[
    {"nid":79,"type":"User","x":89,"y":82,"fields":
      {"in":[
        {"name":"id"},
        {"name":"firstname"},
        {"name":"surname"},
        {"name":"posts"},
        {"name":"comments"}
      ],
      "out":[
        {"name":"@id"},
        {"name":"String"},
        {"name":"String"},
        {"name":"Post[]"},
        {"name": "Comment[ ]"}
      ]}},
    {"nid":80,"type":"Comment","x":484,"y":82,"fields":{
      "in":[
        {"name":"id"},
        {"name":"post"},
        {"name":"user"},
        {"name":"data"}
      ],
      "out":[
        {"name":"@id"},
        {"name":"Post"},
        {"name":"User"},
        {"name":"String"}
      ]}},
      {"nid":82,"type":"Post","x":284,"y":82,"fields":{
        "in":[
          {"name":"id"},
          {"name":"user"},
          {"name":"comments"},
          {"name":"data"}
        ],
        "out":[
          {"name":"@id"},
          {"name":"User"},
          {"name":"Comment[ ]"},
          {"name":"String"}
        ]}},
  ],
  "connections":[
  ]
};

export default () => {
  function onNewConnector(fromNode: number,fromPin: string,toNode: number,toPin: string) {
    console.log("New Connector Added");
  }

  function onRemoveConnector(connector) {
    console.log("Connector Removed");
  }

  function onNodeMove(nid, pos) { 
    console.log('end move : ' + nid, pos)
  }

  function onNodeStartMove(nid) { 
    console.log('start move : ' + nid)
  }

  function handleNodeSelect(nid) {
    console.log('node selected : ' + nid)
  }

  function handleNodeDeselect(nid) {
    console.log('node deselected : ' + nid)
  }

  return (
    <NaphProvider data={exampleGraph}>

      <NaphGraph 
        onNodeMove={(nid, pos)=>onNodeMove(nid, pos)}
        onNodeStartMove={(nid)=>onNodeStartMove(nid)}
        onNewConnector={(n1,o,n2,i)=>onNewConnector(n1,o,n2,i)}
        onRemoveConnector={(connector)=>onRemoveConnector(connector)}
        onNodeSelect={(nid) => {handleNodeSelect(nid)}}
        onNodeDeselect={(nid) => {handleNodeDeselect(nid)}}
      />
    </NaphProvider>

  );      
}