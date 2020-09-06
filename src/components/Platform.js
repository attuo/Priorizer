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
  scheduleArea: {
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
  },
  doneArea: {
    name: "Done",
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

  const removeTodo = (key, index) => {
    let area = areaList[key];
    area.items.splice(index, 1);
    // TODO: Need to change that only items array is set, not whole area object
    const newObj = { ...areaList, [key]: area };
    setAreaList(newObj);
  }

  const areas = Object.entries(areaList).map(([areaKey, area], index) =>
    <Area key={areaKey} areaKey={areaKey} data={area} add={addTodo} remove={removeTodo} />
  );

  return (
    <div className="platform">
      <DragDropContext onDragEnd={result => onDragEnd(result, areaList, setAreaList)}>
        
        <div className="urgent">Urgent</div>
        <div className="not-urgent">Not urgent</div>
        
        <Area key={"doArea"} areaKey={"doArea"} data={areaList.doArea} add={addTodo} remove={removeTodo} />
        <Area key={"scheduleArea"} areaKey={"scheduleArea"} data={areaList.scheduleArea} add={addTodo} remove={removeTodo} />
        <Area key={"delegateArea"} areaKey={"delegateArea"} data={areaList.delegateArea} add={addTodo} remove={removeTodo} />
        <Area key={"eliminateArea"} areaKey={"eliminateArea"} data={areaList.eliminateArea} add={addTodo} remove={removeTodo} />

        <div className="important">Important</div>
        <div className="not-important">Not important</div>

        {/* <div class="area-done"> */}
        <Area key={"doneArea"} areaKey={"doneArea"} data={areaList.doneArea} add={addTodo} remove={removeTodo} />
        {/* </div> */}
      </DragDropContext>
    </div>
  )
}

export default Platform;