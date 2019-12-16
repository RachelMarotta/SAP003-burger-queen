import React from 'react';

const Input = (props) => {
    return (
    <input 
    onClick={props.handleClick}
    className={props.className}
    title={props.title}
    value={props.value}/>
    )
}

export default Input;