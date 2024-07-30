import React from "react";
import Header from "../components/Header";
import { UI } from "../components/UI/main";

function Home() {
  return (
    <div className="Home-page">
      <Header
        menuList={[
          { url: "/login", label: "sigh in" },
          { url: "/i", label: "transfer" },
        ]}
      />
    </div>
  );
}

export default Home;
