import React from "react";

function Log(props) {
  const logItems = props.logData.map((logItem) => (
    <div
      className={props.display ? "log-item" : "log-item hide"}
      key={logItem.identifier}
    >
      <p>
        {logItem.name}: {logItem.value}
      </p>
    </div>
  ));
  return <div className="log">{logItems}</div>;
}

export default Log;
