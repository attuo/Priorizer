import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Todo from '../Todo/Todo';

import './AreaContent.css'

function AreaContent(props) {
  const { areaKey, todos, change, remove } = props;

  return (
    <div className={"area-content"}>

      <Droppable key={areaKey} droppableId={areaKey} >
        { (provided, snapshot) => (
          
          <div className={"area-droppable" + (snapshot.isDraggingOver ? " dragging-over" : "")} {...provided.droppableProps} ref={provided.innerRef}>
            <TransitionGroup component={null}>
              
            { todos.map((item, index) =>
              <CSSTransition key={item.id} classNames="item" timeout={300} exit={false}>
                <Todo areaKey={areaKey} key={item.id} data={item} index={index} change={change} remove={remove} />
              </CSSTransition>)
            }

            </TransitionGroup>
            {provided.placeholder}
          </div>

        )}
      </Droppable>

    </div>
  )
}

export default AreaContent;