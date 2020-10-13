import React from 'react';
import { PlusSquare } from 'react-feather';

import './AreaHeader.css'

function AreaHeader(props) {
  const { areaKey, title, add } = props;
  
  return (
    <div className={"area-title"}>
      <h2 className="title-text">{title}</h2>
      <button onClick={() => add(areaKey)}><PlusSquare/></button>
    </div>
  )
}

export default AreaHeader;