import React from "react";
import { Link, withRouter } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <div className="card-container">
        <Link className="card__link" to="/text-parser" name="GVTextParser">
          <div className="card">Google Voice Text Fixer</div>
        </Link>

        <Link className="card__link" to="/welcome-call-helper" name="WCHelper">
          <div className="card"> Welcome Call Helper</div>
        </Link>
      </div>
    </main>
  );
}

export default withRouter(Home);
