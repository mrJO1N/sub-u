import React, { HTMLAttributes, useContext } from "react";
import "../styles/Header.css";
import { MenuItemI, whenAuthI } from "../types";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header(
  props: HTMLAttributes<HTMLDivElement> & { menuList: MenuItemI[] }
) {
  const { isAuth, userData } = useContext(AuthContext);

  const whenAuth: whenAuthI = {};
  if (isAuth) {
    whenAuth.avatarProps = { menu: [{ url: "/settings", label: "settings" }] };
  }

  const userBalance = String(userData?.balance ?? 0).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " "
  );

  return (
    <header>
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
          <li>
            <span className="dollar">$</span>
            <span className="balance">{userBalance}</span>
          </li>
          {isAuth && (
            <li>
              <img
                className="avatar-icon"
                src="https://cdn.onlinewebfonts.com/svg/img_568656.png"
                alt="ava"
                height={72}
                width={72}
              />
            </li>
          )}
        </ul>
      </div>
      <div className="addict-menu-root">
        <div className="addict-menu">
          {whenAuth.avatarProps &&
            whenAuth.avatarProps.menu.map((menuItem) => {
              return (
                <li key={menuItem.url}>
                  <Link to={menuItem.url}>{menuItem.label}</Link>
                </li>
              );
            })}
        </div>
      </div>
    </header>
  );
}

export default Header;
