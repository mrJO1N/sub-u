import React from "react";
import { BrowserRouter } from "react-router-dom";
// import { getUsers } from "./API/main";
import Header from "../components/Header";
import { UI } from "../components/UI/main";

function HomePage() {
  return (
    <div className="Home-page">
      <Header
        menuList={[
          { url: "/i", label: "sigh in" },
          { url: "/i", label: "transfer" },
        ]}
      />
    </div>
  );
}

export default HomePage;
