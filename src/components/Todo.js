import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Text from "./Text";

import './Todo.css'

function Todo(props) {
  // TODO: Use hooks to NOT pass the "remove" props all the way down here
  const { data, areaKey, index, remove, change } = props;
  
  return(
    <Draggable key={data.id} draggableId={data.id} index={index}>
      {(provided, snapshot) => 
          <div
            className="todo"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Text
            text={data.text}
            onSetText={text => change(areaKey, index, text)}
           />
            <button onClick={() => remove(areaKey, index)}>X</button>
          </div>
      }
    </Draggable>
  );
}

export default Todo;