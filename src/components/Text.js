import React, { useState, useEffect, useRef, useCallback } from "react";
import useKeypress from "../hooks/useKeyPress";
import useOnClickOutside from "../hooks/useOnClickOutside";

import './Text.css';

function Text(props) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  const { onSetText } = props;


  // Click outside
  // useOnClickOutside(wrapperRef, () => {
  //   console.log("Käy outside");
  //   if (isInputActive) {
  //     onSetText(inputValue);
  //     setIsInputActive(false);
  //   }
  // });

  const onEnter = useCallback(() => {
    if (enter) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  }, [enter, inputValue, onSetText]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(props.text);
      setIsInputActive(false);
    }
  }, [esc, props.text]);

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
    onSetText(inputValue);
    setIsInputActive(false);
  }

  const handleEdit = () => {
    console.log("Käy täällä");
    // TODO: Fix EDIT bug
    setIsInputActive(true);
  }

  return (
    <>
    <span className="inline-text">
      { isInputActive ? 
        <input
          className="text-input"
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
        />
      :
        <span
          className="text-input"
          ref={textRef}
        >
          {props.text}
        </span>
      }  
    </span>
    { isInputActive ?  
      <button className="action-button" onClick={handleSave}>S</button>
      :
      <button className="action-button" onClick={handleEdit}>E</button>
    }
    
    </>
  );
}

export default Text;
