import React from 'react';

function Input(props) {
  return (
    <div>
      <label>{props.label}</label>
      <input
        className={props.className}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.holder}
      />
    </div>
  )
}

export default Input