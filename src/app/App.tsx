import React from "react";
import "tachyons";
import "./App.css";
import { LinksList } from "../features/links/LinksList";

function App() {
  return (
    <div className="helvetica">
      <header className="bb b--light-gray">
        <div className="mw8 w-100 center pa3">
          <a href="/" className="link">
            <h1 className="ma0 red f4">Bely</h1>
          </a>
        </div>
      </header>
      <LinksList />
    </div>
  );
}

export default App;
