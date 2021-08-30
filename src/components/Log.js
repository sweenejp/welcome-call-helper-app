import React from "react";

function Log(props) {
  const logItems = props.logData.map((logItem) => {
    const paragraphs = logItem.value
      .split("\n")
      .map((item, index) => <p key={logItem + item + index}>{item}</p>);
    return (
      <div
        className={props.display ? "log-item" : "log-item hide"}
        key={logItem.identifier}
      >
        <p className="log-item__field-name">{logItem.name}:</p>
        {paragraphs}
      </div>
    );
  });
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
