import React from 'react';
import usePersistedState from '../hooks/usePersistedState';
import { DragDropContext } from 'react-beautiful-dnd';
import { onDragEnd } from '../utils/drag';
import { generateId } from '../utils/idgenerator';
import { initializeData } from '../utils/initData';

import Area from './Area';

import './Platform.css';


function Platform() {
  const [areas, setAreas] = usePersistedState("areaList", initializeData);

  const addTodo = (key) => {
    const newTodo = { id: generateId(), text: ""}
    let area = areas[key];
    console.log("")
    area.items.push(newTodo);
    // TODO: Need to change that only items array is set, not whole area object
    const newObj = { ...areas, [key]: area };
    setAreas(newObj);
  }

  const removeTodo = (key, index) => {
    let area = areas[key];
    area.items.splice(index, 1);
    // TODO: Need to change that only items array is set, not whole area object
    const newObj = { ...areas, [key]: area };
    setAreas(newObj);
  }

  const changeTodo = (key, index, text) => {
    let area = areas[key];
    area.items[index].text = text;
    const newObj = { ...areas, [key]: area}
    setAreas(newObj);
  }

  const areaComponents = Object.entries(areas).map(([areaKey, area], index) =>
    <Area key={areaKey} areaKey={areaKey} data={area} add={addTodo} change={changeTodo} remove={removeTodo} />
  );

  return (
    <div className="platform">
        
        <div className="label urgent">Urgent</div>
        <div className="label not-urgent">Not urgent</div>
        <div className="label important">Important</div>
        <div className="label not-important">Not important</div>

      <DragDropContext onDragEnd={result => onDragEnd(result, areas, setAreas)}>
        {areaComponents}
      </DragDropContext>
    </div>
  )
}

export default Platform;