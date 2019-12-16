# Naph 
## Experimental - *Use at your own peril!*

<p align="center">
  <img src="./Naph.png"/>
</p>

[![npm version](https://badge.fury.io/js/naph.svg)](https://badge.fury.io/js/naph)
## Install

#### NPM:
```sh
npm install --save naph
```

## Usage


```jsx
import NaphGraph, { NaphProvider } from 'naph';

const example = {
  "nodes":[
    {"nid":0,"type":"Timer","x":89,"y":82,"fields":{"in":[{"name":"reset"},{"name":"pause"},{"name":"max"}],"out":[{"name":"out"}]}},
    {"nid":1,"type":"MathMult","x":284,"y":82,"fields":{"in":[{"name":"in"},{"name":"factor"}],"out":[{"name":"out"}]}},
    {"nid":2,"type":"Vector3","x":486,"y":188,"fields":{"in":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}],"out":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}]}}
  ],
  "connections":[
    {"from_node":nid,"from":"field_name","to_node":nid,"to":"field_name"},
  ]
};

export const Naph = () => ( 
  <NaphProvider data={example}>
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

```

