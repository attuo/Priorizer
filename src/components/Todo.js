import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Edit, CheckSquare, XSquare } from 'react-feather';
import useKeypress from "../hooks/useKeyPress";
import useOnClickOutside from "../hooks/useOnClickOutside";

import './Todo.css'

function Todo(props) {

  // TODO: Use hooks to NOT pass the "remove" props all the way down here
  // TODO: Don't render all the changes all the time
  const { data, areaKey, index, remove, change } = props;

  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(data.text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");


  // Click outside
  // useOnClickOutside(wrapperRef, () => {
  //   if (isInputActive) {
  //     onSetText(inputValue);
  //     setIsInputActive(false);
  //   }
  // });

  const onEnter = useCallback(() => {
    if (enter) {
      change(areaKey, index, inputValue);
      setIsInputActive(false);
    }
  }, [enter, inputValue, change]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(data.text);
      setIsInputActive(false);
    }
  }, [esc, data.text]);

  // focus the cursor when edit is active
  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      onEnter(); // save text changes 
      onEsc(); // revert text changes
    }
  }, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

  const handleInputChange = useCallback(
    (event) => {
      // TODO: Sanitize input
      setInputValue(event.target.value);
    },
    [setInputValue]
  );

  const handleSave = () => {
    change(areaKey, index, inputValue);
    setIsInputActive(false);
  }

  const handleEdit = () => {
    setIsInputActive(true);
  }

  return(
    <Draggable key={data.id} draggableId={data.id} index={index}>
      {(provided, snapshot) => 
        <div
          className={`todo ${snapshot.isDragging ? " active" : ""} ${isInputActive ? " active": ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="text-section">
            { isInputActive ? 
              <textarea
                className="text-input"
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
              />
              :
              <span className="text-input" ref={textRef}>
                {data.text}
              </span>
            }  
          </div>
          <div class="button-section">
            { isInputActive ?
              <button className="action-button save-button" onClick={handleSave}><CheckSquare/></button>
            :
              <button className="action-button edit-button" onClick={handleEdit}><Edit/></button>
            }
            <button className="action-button remove-button" onClick={() => remove(areaKey, index)}><XSquare /></button>
          </div>
        </div>
      }
    </Draggable>
  );
}

export default Todo;