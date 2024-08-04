import React, { HTMLAttributes, useContext } from "react";
import "../styles/Header.css";
import { MenuItemI } from "../types";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header(
  props: HTMLAttributes<HTMLDivElement> & { menuList: MenuItemI[] }
) {
  const { isAuth } = useContext(AuthContext);

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
        {isAuth && (
          <li>
            <img
              src="https://cdn.onlinewebfonts.com/svg/img_568656.png"
              alt="ava"
              height={72}
              width={72}
            />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
