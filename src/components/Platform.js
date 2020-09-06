import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { onDragEnd } from '../utils/drag';
import { generateId } from '../utils/idgenerator';
import Area from './Area';

import './Platform.css';


const createNewTodo = () => {
  return { id: generateId(), text: "Test text"}
}

const areasFromBackend = 
{ 
  doArea: {
    name: "Do",
    items: []
  },
  scheludeArea: {
    name: "Schedule",
    items: []
  },
  delegateArea: {
    name: "Delegate",
    items: [ createNewTodo() ]
  },
  eliminateArea: {
    name: "Eliminate",
    items: []
  }
}



function Platform() {
  const [areaList, setAreaList] = useState(areasFromBackend);

  const addTodo = (key) => {
    const newTodo = createNewTodo();
    let area = areaList[key];
    area.items.push(newTodo);
    // TODO: Need to change that only items array is set, not whole area object
    const newObj = { ...areaList, [key]: area };
    setAreaList(newObj);
  }

  const areas = Object.entries(areaList).map(([areaKey, area], index) =>
    <Area key={areaKey} areaKey={areaKey} data={area} add={addTodo} />
  );

  return (
    <div className="platform">
      <DragDropContext onDragEnd={result => onDragEnd(result, areaList, setAreaList)}>
        <div className="corner"></div>
        <div className="urgent">Urgent</div>
        <div className="not-urgent">Not urgent</div>
        {areas}
        <div className="important">Important</div>
        <div className="not-important">Not important</div>
      </DragDropContext>
    </div>
  )
}

export default Platform;