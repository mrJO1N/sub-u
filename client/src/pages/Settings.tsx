import React from "react";
import { Link } from "react-router-dom";
import { UI } from "../components/UI/main";
import "../styles/Settings-page.css";
import AvatarIcon from "../components/AvatarIcon";

function Home() {
  const menuList = [{ url: "/settings/general", label: "general" }];

  return (
    <div className="Settings-page">
      <div className="left-panel">
        <ul className="left-panel-menu">
          {menuList.map((menuItem) => {
            return (
              <li key={menuItem.url}>
                <Link to={menuItem.url}>{menuItem.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="page-container">
        <div className="avatar-editor">
          <AvatarIcon height={200} width={200} />
          <UI.Button>change ava</UI.Button>
        </div>
        <div className="user-data-editor">
          user data{" "}
          <div className="editor">
            <div className="field-names">
              <span>username</span>
              <span>email</span>
              <span>password</span>
            </div>
            <div className="field-inputs">
              <span>username</span>
              <span>email</span>
              <span>password</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
