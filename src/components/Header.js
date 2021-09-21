import React from "react";
import { Link, withRouter } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <div className="header__flex-box">
        <Link className="header__title" to="/" name="Home">
          <h1>{props.siteTitle}</h1>
        </Link>
        <button
          className="header__button"
          onClick={props.toggle}
          name="themeIsLight"
        >
          Toggle {props.themeIsLight ? "Dark" : "Light"}
        </button>
        <Link className="header__button" to="/text-parser" name="GVTextParser">
          GV Text Fixer
        </Link>
        <Link
          className="header__button"
          to="/welcome-call-helper"
          name="WCHelper"
        >
          WC Helper
        </Link>
      </div>
    </header>
  );
}

export default withRouter(Header);
