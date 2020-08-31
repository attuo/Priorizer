import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Area from './Area';

import './Platform.css';

const areasFromBackend = 
{ 
  Area1: {
    name: "Do",
    items: [ { id: "Item1", text: "Test1" }, { id: "Item2", text: "Test2" }, { id: "Item7", text: "Test7" }]
  },
  Area2: {
    name: "Schedule",
    items: [ { id: "Item3", text: "Test3" }, { id: "Item4", text: "Test4" }]
  },
  Area3: {
    name: "Delegate",
    items: [ { id: "Item5", text: "Test5" }, { id: "Item6", text: "Test6" }]
  },
  Area4: {
    name: "Eliminate",
    items: []
  }
}

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function Platform() {
  const [areaList, setAreaList] = useState(areasFromBackend);

  const areas = Object.entries(areaList).map(([areaKey, area], index) =>
    <Area key={areaKey} areaKey={areaKey} data={area} />
  );

  return (
    <div className="platform">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, areaList, setAreaList)}
      >
        {areas}
      </DragDropContext>
    </div>
  )
}

export default Platform;