import "./App.css";
import React from "react";
import WorldClock from "./components/WorldClock";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="App">
          <h1>Мировые часы</h1>
          <WorldClock />
        </div>
      </>
    );
  }
}

export default App;
