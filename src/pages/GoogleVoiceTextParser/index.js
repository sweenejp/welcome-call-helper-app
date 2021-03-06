import React from "react";

class GoogleVoiceTextParser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { in: "", out: "", displayNotice: false };
    this.handleChange = this.handleChange.bind(this);
    this.parse = this.parse.bind(this);
    this.clearIn = this.clearIn.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  clearIn() {
    this.setState({ in: "" });
  }

  parse() {
    this.setState({ displayNotice: false, out: "" });
    let matches = this.state.in.match(/(Message from .*)/g);
    if (matches !== null) {
      const updatedOut = matches.join("\n");
      this.setState({ out: updatedOut, displayNotice: true });
      navigator.clipboard.writeText(updatedOut);
    }
  }

  componentDidMount() {
    const inValue = localStorage.getItem("GVTPin")
      ? localStorage.getItem("GVTPin")
      : "";
    const outValue = localStorage.getItem("GVTPout")
      ? localStorage.getItem("GVTPout")
      : "";
    const displayNotice =
      localStorage.getItem("GVTPdisplayNotice") === "true" ? true : false;
    this.setState({
      in: inValue,
      out: outValue,
      displayNotice: displayNotice,
    });
  }

  componentDidUpdate() {
    localStorage.setItem("GVTPin", this.state.in);
    localStorage.setItem("GVTPout", this.state.out);
    localStorage.setItem("GVTPdisplayNotice", this.state.displayNotice);
  }

  render() {
    return (
      <main className="app">
        <div className="text-parser__container">
          <ul>
            <li className="help__list-item">
              Copy and paste a text conversation from Google Voice into the box
              below.
            </li>
            <li className="help__list-item">Click "fix!"</li>
            <li className="help__list-item">
              The annoying duplicate messages get removed!
            </li>
          </ul>
          <h2 className="sub-app__title">Google Voice Text Fixer</h2>
          <textarea
            name="in"
            value={this.state.in}
            onChange={this.handleChange}
            className="text-parser__textarea in"
          ></textarea>
          <div className="button-container">
            <button onClick={this.parse}>Fix!</button>
            <button onClick={this.clearIn}>Clear</button>
          </div>
          <p
            className={
              this.state.displayNotice
                ? "text-parser__notice show"
                : "text-parser__notice"
            }
          >
            Great success! No need to highlight and copy the text below. It is
            already copied to your clipboard. Just paste into the log.
          </p>
          <textarea
            readOnly={true}
            name="out"
            value={this.state.out}
            className="text-parser__textarea out"
          ></textarea>
        </div>
      </main>
    );
  }
}

export default GoogleVoiceTextParser;
