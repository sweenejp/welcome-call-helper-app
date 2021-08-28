import React from "react";

function FieldAdder(props) {
  return (
    <div className="field-adder">
      <label htmlFor="field-adder">
        Add a field:
        <input type="text" name="fieldToAdd" onChange={props.handleChange} />
        <button onClick={props.handleClick}>Add field</button>
      </label>
    </div>
  );
}

export default FieldAdder;
