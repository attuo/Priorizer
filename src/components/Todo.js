import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Text from "./Text";
import { XSquare } from 'react-feather';

import './Todo.css'

function Todo(props) {
  // TODO: Use hooks to NOT pass the "remove" props all the way down here
  // TODO: Don't render all the changes all the time
  const { data, areaKey, index, remove, change } = props;

  return(
    <Draggable key={data.id} draggableId={data.id} index={index}>
      {(provided, snapshot) => 
          <div
            className={`todo ${snapshot.isDragging ? "dragging" : ""}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Text
            text={data.text}
            onSetText={text => change(areaKey, index, text)}
           />
           <button className="action-button remove-button" onClick={() => remove(areaKey, index)}><XSquare /></button>
            
          </div>
      }
    </Draggable>
  );
}

export default Todo;