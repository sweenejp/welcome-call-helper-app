import React from "react";

function Field(props) {
  return (
    <div className="field" id={props.identifier}>
      <label className="field__label" htmlFor={props.name}>
        {props.name}
      </label>
      <div className="field__textarea">
        <textarea
          name={props.identifier}
          onChange={props.handleTextareaChange}
          value={props.value}
          onKeyDown={props.handleKeyUp}
        ></textarea>
      </div>
    </div>
  );
}

export default Field;
