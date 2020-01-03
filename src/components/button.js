import React from 'react';

function Button(props) {
  return (
    <button
      onClick={props.handleClick}
      className={props.className}
      id={props.id}
    >{props.item} {props.title} {props.Name} {props.Price} </button>
  )
}

export default Button;