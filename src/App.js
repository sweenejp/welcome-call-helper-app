import React from "react";
import FieldAdder from "./components/FieldAdder";
import Field from "./components/Field";
import Log from "./components/Log";
import Header from "./components/Header";
import Help from "./components/Help";

const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteTitle: "Question Logger",
      fields: [],
      fieldToAdd: "",
      currentKey: 0,
      displayLog: false,
      displayHelp: true,
      themeIsLight: true,
    };
    this.fieldAdder = this.fieldAdder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  fieldAdder(event) {
    if (event.key === "Enter") {
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
    }
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
    // remove
    if (event.key === "Delete") {
      updatedFields = fieldsMinusObject;
      // shift up
    } else if (event.shiftKey && event.key === "ArrowUp") {
      if (index !== 0) {
        updatedFields = insert(fieldsMinusObject, index - 1, fieldObjectToMove);
      } else {
        updatedFields = this.state.fields;
      }
      // shift down
    } else if (event.shiftKey && event.key === "ArrowDown") {
      updatedFields = insert(fieldsMinusObject, index + 1, fieldObjectToMove);
    } else {
      updatedFields = this.state.fields;
    }

    this.setState({ fields: updatedFields });
  }

  clearFields() {
    const clearedFields = this.state.fields.map((item) => {
      item.value = "";
      return item;
    });
    this.setState({ fields: clearedFields });
  }

  toggle(event) {
    const name = event.target.name;
    this.setState({ [name]: !this.state[name] });
  }

  componentDidMount() {
    const currentKey = localStorage.getItem("currentKey")
      ? parseInt(localStorage.getItem("currentKey"))
      : 0;
    const fields = localStorage.getItem("fields")
      ? JSON.parse(localStorage.getItem("fields"))
      : [];
    const displayLog =
      localStorage.getItem("displayLog") === "true" ? true : false;
    const displayHelp =
      localStorage.getItem("displayHelp") === "true" ? true : false;
    const themeIsLight =
      localStorage.getItem("themeIsLight") === "true" ? true : false;
    this.setState({
      fields: fields,
      currentKey: currentKey,
      displayLog: displayLog,
      displayHelp: displayHelp,
      themeIsLight: themeIsLight,
    });
  }

  componentDidUpdate() {
    localStorage.setItem("fields", JSON.stringify(this.state.fields));
    localStorage.setItem("currentKey", this.state.currentKey);
    localStorage.setItem("displayLog", this.state.displayLog);
    localStorage.setItem("displayHelp", this.state.displayHelp);
    localStorage.setItem("themeIsLight", this.state.themeIsLight);
    console.log(localStorage);
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
      <div
        className={
          this.state.themeIsLight ? "app theme-light" : "app theme-dark"
        }
      >
        <Header siteTitle={this.state.siteTitle} />
        <main>
          <div className="menu">
            <button onClick={this.clearFields}>Clear Fields</button>
            <button name="displayHelp" onClick={this.toggle}>
              {this.state.displayHelp ? "Hide" : "Show"} help
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to reset everything? This will delete all the fields you created."
                  )
                ) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
            >
              ⚠️ Reset Everything
            </button>
            <button onClick={this.toggle} name="themeIsLight">
              Toggle {this.state.themeIsLight ? "Dark" : "Light"}
            </button>
          </div>
          <Help display={this.state.displayHelp} toggle={this.toggle} />

          <FieldAdder
            handleChange={this.handleChange}
            handleKeyUp={this.fieldAdder}
          />
          <div className="fields">{fields}</div>
          <Log
            display={this.state.displayLog}
            logData={this.state.fields}
            toggle={this.toggle}
          />
        </main>
      </div>
    );
  }
}

export default App;
