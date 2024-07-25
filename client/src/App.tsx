import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <div className="App">
      {/* <Header
        menuList={[
          { url: "/i", label: "sigh in" },
          { url: "/i", label: "transfer" },
        ]}
      /> */}

      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
