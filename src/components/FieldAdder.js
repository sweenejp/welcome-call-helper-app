import React from "react";

function FieldAdder(props) {
  return (
    <div className="field-adder">
      <label className="field-adder__label>" htmlFor="field-adder">
        Add a field:
      </label>
      <input
        className="field-adder__input"
        type="text"
        name="fieldToAdd"
        onChange={props.handleChange}
        onKeyUp={props.handleKeyUp}
      />
    </div>
  );
}

export default FieldAdder;
