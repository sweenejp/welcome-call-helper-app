import React from "react";

function Log(props) {
  const logItems = props.logData.map((logItem) => (
    <p className="log-item" key={logItem.identifier}>
      {logItem.name}: {logItem.value}
    </p>
  ));
  return (
    <div className="log">
      <button name="displayLog" onClick={props.toggle}>
        {props.display ? "Hide" : "Show"} log
      </button>
      {logItems}
    </div>
  );
}

export default Log;
