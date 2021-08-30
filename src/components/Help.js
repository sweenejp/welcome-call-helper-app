import React from "react";

function Help(props) {
  const className = props.display ? "help__list-item" : "help__list-item hide";
  return (
    <div className="help">
      <ul>
        <li className={className}>
          Type and hit 'enter' to create a new field.
        </li>
        <li className={className}>
          Select a field and hit 'delete' to remove a field
        </li>
        <li className={className}>
          Hit 'tab' to cycle through fields. 'Shift + tab' to reverse cycle.
        </li>
        <li className={className}>
          Hold 'shift' and up/down arrows to rearrange fields
        </li>
        <li className={className}>
          Highlight, copy, and paste the log below when done
        </li>
        <li className={className}>
          Works best on Firefox or Chrome. No promises for Safari or Internet
          Explorer!
        </li>
      </ul>
    </div>
  );
}

export default Help;
