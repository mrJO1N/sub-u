import React from "react";
import "./App.css";
// import { getUsers } from "./API/main";
import { UI } from "./components/UI/main";

function App() {
  return (
    <div className="App">
      <UI.Modal name="login" className="active">
        <UI.Input placeholder="email" />
        <UI.Input placeholder="name" />
        <UI.Input placeholder="name" />
        <UI.Input placeholder="name" />
        <UI.Input placeholder="name" />
        <UI.Button>test</UI.Button>
      </UI.Modal>
    </div>
  );
}

export default App;
