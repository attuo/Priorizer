import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { PlusSquare } from 'react-feather';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Todo from './Todo';

import './Area.css'

function Area(props) {
  const { data, areaKey, add, remove, change } = props;
  const areaClassName = data.name.toLowerCase(); 

  const todos = data.items.map((item, index) =>
    <CSSTransition key={item.id} classNames="item" timeout={300} exit={false}>
      <Todo areaKey={areaKey} key={item.id} data={item} index={index} remove={remove} change={change}/>
    </CSSTransition>
  );

  return (
    <div key={areaKey} className={`area ${areaClassName}-area`}>
      <div className={"area-title"}>
        <h2 className="title-text">{data.name}</h2>
        <button onClick={() => add(areaKey)}><PlusSquare/></button>
      </div>
      <div className={"area-content"}>
      <Droppable key={areaKey} droppableId={areaKey} >
        { (provided, snapshot) => (
          <div className={"area-droppable" + (snapshot.isDraggingOver ? " dragging-over" : "")} {...provided.droppableProps} ref={provided.innerRef}>
            <TransitionGroup component={null}>
              {todos}
            </TransitionGroup>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
</div>
    </div>
  )
}

export default Area;