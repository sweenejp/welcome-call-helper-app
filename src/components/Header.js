import React from "react";
import { Link, withRouter } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <div className="header__flex-box">
        <h1 className="header__title">{props.siteTitle}</h1>
        <button
          className="header__button"
          onClick={props.toggle}
          name="themeIsLight"
        >
          Toggle {props.themeIsLight ? "Dark" : "Light"}
        </button>
        <Link className="header__button" to="/text-parser" name="GVTextParser">
          GV Text Parser
        </Link>
        <Link className="header__button" to="/" name="WCHelper">
          WC Helper
        </Link>
      </div>
    </header>
  );
}

export default withRouter(Header);
