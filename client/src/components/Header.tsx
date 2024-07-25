import React, { HTMLAttributes } from "react";
import "../styles/Header.css";
import { MenuItemI } from "../types";

function Header(
  props: HTMLAttributes<HTMLDivElement> & { menuList: MenuItemI[] }
) {
  return (
    <div className="Header">
      <span className="logo">sub U</span>
      <ul className="menu">
        {props.menuList.map((menuItem) => {
          return (
            <li key={menuItem.url}>
              <a href={menuItem.url}>{menuItem.label}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Header;
