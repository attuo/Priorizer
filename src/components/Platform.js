import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { onDragEnd } from '../utils/drag'
import Area from './Area';

import './Platform.css';

const areasFromBackend = 
{ 
  doArea: {
    name: "Do",
    items: [ { id: "Item1", text: "Test1" }, { id: "Item2", text: "Test2" }, { id: "Item7", text: "Test7" }]
  },
  scheludeArea: {
    name: "Schedule",
    items: [ { id: "Item3", text: "Test3" }, { id: "Item4", text: "Test4" }]
  },
  delegateArea: {
    name: "Delegate",
    items: [ { id: "Item5", text: "Test5" }, { id: "Item6", text: "Test6" }]
  },
  eliminateArea: {
    name: "Eliminate",
    items: []
  }
}

function Platform() {
  const [areaList, setAreaList] = useState(areasFromBackend);

  const areas = Object.entries(areaList).map(([areaKey, area], index) =>
    <Area key={areaKey} areaKey={areaKey} data={area} />
  );

  return (
    <div className="platform">
      <DragDropContext onDragEnd={result => onDragEnd(result, areaList, setAreaList)}>
        <div className="corner"></div>
        <div className="urgent">Urgent</div>
        <div className="not-urgent">Not urgent</div>
        {areas}
        <div className="important">Not important</div>
        <div className="not-important">Important</div>
      </DragDropContext>
    </div>
  )
}

export default Platform;