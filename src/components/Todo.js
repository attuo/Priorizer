import React from 'react';

import './Todo.css'
import { Draggable } from 'react-beautiful-dnd';

function Todo(props) {
  // TODO: Use hooks to NOT pass the "remove" props all the way down here
  const { data, areaKey, index, remove } = props;
  
  return(
    <Draggable key={data.id} draggableId={data.id} index={index}>
      {(provided, snapshot) => 
          <div
            className="todo"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {data.text}
            <button onClick={() => remove(areaKey, index)}>X</button>
          </div>
      }
    </Draggable>
  );
}

export default Todo;