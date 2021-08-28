import React from "react";
import FieldAdder from "./components/FieldAdder";
import Field from "./components/Field";
import Log from "./components/Log";

const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      fieldToAdd: "",
      currentKey: 0,
      displayLog: false,
    };
    this.fieldAdder = this.fieldAdder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.toggleLog = this.toggleLog.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  fieldAdder() {
    const newField = this.state.fieldToAdd;
    const updatedFields = this.state.fields.concat({
      name: newField,
      value: "",
      identifier: "Item" + this.state.currentKey,
    });
    const newKey = this.state.currentKey + 1;
    this.setState({
      fields: updatedFields,
      currentKey: newKey,
    });
    localStorage.setItem("fields", JSON.stringify(updatedFields));
    localStorage.setItem("currentKey", newKey);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleTextareaChange(event) {
    const { value, name } = event.target;
    const fieldIdentifier = name;
    const updatedFields = this.state.fields.map((item) => {
      if (Object.values(item).includes(fieldIdentifier)) {
        item.value = value;
      }
      return item;
    });
    this.setState({ fields: updatedFields });
    localStorage.setItem("fields", JSON.stringify(this.state.fields));
  }

  handleKeyUp(event) {
    const fieldIdentifier = event.target.name;
    let updatedFields = [];
    const fieldsMinusObject = this.state.fields.filter(
      (item) => !Object.values(item).includes(fieldIdentifier)
    );
    const fieldObjectToMove = this.state.fields.filter((item) =>
      Object.values(item).includes(fieldIdentifier)
    )[0];
    const index = this.state.fields.indexOf(fieldObjectToMove);
    //remove
    console.log(event.key);
    if (event.key === "Delete") {
      updatedFields = fieldsMinusObject;
    } else if (event.shiftKey && event.key === "ArrowUp") {
      updatedFields = insert(fieldsMinusObject, index - 1, fieldObjectToMove);
    } else if (event.shiftKey && event.key === "ArrowDown") {
      updatedFields = insert(fieldsMinusObject, index + 1, fieldObjectToMove);
    } else {
      updatedFields = this.state.fields;
    }

    this.setState({ fields: updatedFields });
    localStorage.setItem("fields", JSON.stringify(updatedFields));
  }

  clearFields() {
    const clearedFields = this.state.fields.map((item) => {
      item.value = "";
      return item;
    });
    this.setState({ fields: clearedFields });
    localStorage.setItem("fields", JSON.stringify(clearedFields));
  }

  toggleLog() {
    this.setState({ displayLog: !this.state.displayLog });
    localStorage.setItem("fields", JSON.stringify(this.state.fields));
  }

  componentDidMount() {
    const currentKey = localStorage.getItem("currentKey")
      ? parseInt(localStorage.getItem("currentKey"))
      : 0;
    const fields = localStorage.getItem("fields")
      ? JSON.parse(localStorage.getItem("fields"))
      : [];
    this.setState({
      fields: fields,
      currentKey: currentKey,
    });
  }

  render() {
    const fields = this.state.fields.map((item, index) => (
      <Field
        {...item}
        index={index}
        length={this.state.fields.length}
        key={item.identifier}
        handleChange={this.handleChange}
        handleTextareaChange={this.handleTextareaChange}
        handleKeyUp={this.handleKeyUp}
      />
    ));
    return (
      <div className="app">
        <FieldAdder
          handleChange={this.handleChange}
          handleClick={this.fieldAdder}
        />
        <div className="fields">{fields}</div>
        <button onClick={this.toggleLog}>Toggle log</button>
        <Log display={this.state.displayLog} logData={this.state.fields} />
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Reset Everything
        </button>
        <button onClick={this.clearFields}>Clear Fields</button>
      </div>
    );
  }
}

export default App;
