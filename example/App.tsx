import * as React from 'react';

import NaphGraph, { NaphContext, NaphProvider, Connection, Data } from '../src';
var exampleGraph: Data = {
  "nodes":[
    {"nid":1,"title":"User","x":50,"y":50,"fields":[
        {"name":"id", "type": "@id"},
        {"name":"firstname", "type": "String"},
        {"name":"surname", "type": "String"},
        {"name":"posts", type: "Post[]"},
        {"name":"comments", type: "Comment[ ]"}
      ],
    },
    {"nid":3,"title":"Comment","x":500,"y":300,"fields":[
        {"name":"id", "type":"@id"},
        {"name":"post", "type":"Post"},
        {"name":"user", "type":"User"},
        {"name":"data", "type":"String"},
      ],
    },
      {"nid":2,"title":"Post","x":400,"y":100,"fields":[
          {"name":"id", "type":"@id"},
          {"name":"user", "type":"User"},
          {"name":"comments", "type":"Comment[]"},
          {"name":"data", "type":"String"},
        ],
      },
  ],
  "connections":[
    {
      from_node: 1,
      from_field: {"name":"posts", "type":"Post[]"},
      to_node: 2,
      to_field: {"name":"user", "type":"User"},
    },
    {
      from_node: 1,
      from_field: {"name":"comments", "type":"Comment[]"},
      to_node: 3,
      to_field: {"name":"user", "type":"User"},
    },
    {
      from_node: 2,
      from_field: {"name":"comments", "type":"Comment[]"},
      to_node: 3,
      to_field: {"name":"post", "type":"Post"},
    }
  ]
};

export default () => {
  function onNewConnector(connector: Connection) {
    // console.log("New Connector Added");
  }

  function onRemoveConnector(connector) {
    // console.log("Connector Removed");
  }

  function onNodeMove(nid, pos) { 
    // console.log('end move : ' + nid, pos)
  }

  function onNodeStartMove(nid) { 
    // console.log('start move : ' + nid)
  }

  function handleNodeSelect(nid) {
    // console.log('node selected : ' + nid)
  }

  function handleNodeDeselect(nid) {
    // console.log('node deselected : ' + nid)
  }

  return (
      <NaphProvider data={exampleGraph}>

        <NaphGraph 
          onNodeMove={(nid, pos)=>onNodeMove(nid, pos)}
          onNodeStartMove={(nid)=>onNodeStartMove(nid)}
          onNewConnector={(connector)=>onNewConnector(connector)}
          onRemoveConnector={(connector)=>onRemoveConnector(connector)}
          onNodeSelect={(nid) => {handleNodeSelect(nid)}}
          onNodeDeselect={(nid) => {handleNodeDeselect(nid)}}
        />
      </NaphProvider>
  );      
}