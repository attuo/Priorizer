import React from 'react';

import './Todo.css'
import { Draggable } from 'react-beautiful-dnd';

function Todo(props) {
  const { data, index } = props;
  
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
          </div> 
      }
    </Draggable>
  );
}

export default Todo;