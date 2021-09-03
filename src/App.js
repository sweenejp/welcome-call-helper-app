import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GoogleVoiceTextParser from "./apps/GoogleVoiceTextParser";
import WelcomeCallHelper from "./apps/WelcomeCallHelper";
import Header from "./components/Header";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteTitle: "MNCA Helper Apps",
      themeIsLight: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(event) {
    const name = event.target.name;
    this.setState({ [name]: !this.state[name] });
  }

  componentDidMount() {
    const themeIsLight =
      localStorage.getItem("themeIsLight") === "false" ? false : true;
    this.setState({
      themeIsLight: themeIsLight,
    });
  }

  componentDidUpdate() {
    localStorage.setItem("themeIsLight", this.state.themeIsLight);
    localStorage.setItem("displayWCHelper", this.state.displayWCHelper);
    localStorage.setItem("displayGVTextParser", this.state.displayGVTextParser);
  }

  render() {
    return (
      <div
        className={
          this.state.themeIsLight ? "app theme-light" : "app theme-dark"
        }
      >
        <Router>
          <Header
            siteTitle={this.state.siteTitle}
            toggle={this.toggle}
            themeIsLight={this.state.themeIsLight}
          />
          <Switch>
            <Route path="/" exact component={() => <WelcomeCallHelper />} />
            <Route
              path="/text-parser"
              exact
              component={() => <GoogleVoiceTextParser />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
