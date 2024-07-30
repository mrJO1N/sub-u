import React, { HTMLAttributes } from "react";
import "../styles/Header.css";
import { MenuItemI } from "../types";
import { Link } from "react-router-dom";

function Header(
  props: HTMLAttributes<HTMLDivElement> & { menuList: MenuItemI[] }
) {
  return (
    <div className="Header">
      <Link to="/" className="logo">
        sub U
      </Link>
      <ul className="menu">
        {props.menuList.map((menuItem) => {
          return (
            <li key={menuItem.url}>
              <Link to={menuItem.url}>{menuItem.label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Header;
