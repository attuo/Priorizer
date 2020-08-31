import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Todo from './Todo';

import './Area.css'

function Area(props) {
  const { data, areaKey } = props;

  const todos = data.items.map((item, index) =>
    <Todo key={item.id} data={item} index={index} />
  );

  return (
    <div key={areaKey} className="area">
      <div className="areaTitle">
        <h2>{data.name}</h2>
      </div>
      <div className="areaContent">
      <Droppable  droppableId={areaKey} key={areaKey}>
        { (provided, snapshot) => (
          <div 
            className="droppableArea"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
</div>
    </div>
  )
}

export default Area;