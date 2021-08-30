import React from "react";

function Field(props) {
  return (
    <div className="field" id={props.identifier}>
      <label className="field__label" htmlFor={props.name}>
        {props.name}
      </label>
      <input
        type="text"
        className="field__input"
        name={props.identifier}
        onChange={props.handleTextareaChange}
        value={props.value}
        onKeyUp={props.handleKeyUp}
      />
    </div>
  );
}

export default Field;
