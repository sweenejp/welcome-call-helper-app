import React from "react";

function Header(props) {
  return (
    <header>
      <h1 className="title">{props.siteTitle}</h1>
    </header>
  );
}

export default Header;
