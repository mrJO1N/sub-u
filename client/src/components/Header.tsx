import React, { HTMLAttributes, useContext } from "react";
import "../styles/Header.css";
import { IMenuItem, IMenuOptItem } from "../types";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AvatarIcon from "./AvatarIcon";
import DropDownMenu from "./DropDownMenu";

function Header(
  props: HTMLAttributes<HTMLDivElement> & {
    menuList: TMenuList[];
  }
) {
  const { isAuth, userData } = useContext(AuthContext);

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
          {props.menuList.map((menuItem, index) => {
            if (menuItem.url)
              return (
                <li key={menuItem.url}>
                  <Link to={menuItem.url}>{menuItem.label}</Link>
                </li>
              );
            else if (menuItem.options)
              return (
                <li key={index}>
                  <DropDownMenu
                    target=".avatar-icon"
                    options={menuItem.options ?? {}}
                  >
                    {menuItem.label}
                  </DropDownMenu>
                </li>
              );
          })}
          {isAuth && (
            <>
              <li>
                <div className="balance-root">
                  <span className="dollar">$</span>
                  <span className="balance">{userBalance}</span>
                </div>
              </li>
              <li>
                <DropDownMenu
                  target=".avatar-icon"
                  options={[{ url: "/settings/general", label: "settings" }]}
                >
                  <AvatarIcon height={72} width={72} />
                </DropDownMenu>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

type TMenuList = (IMenuItem | IMenuOptItem) &
  Partial<IMenuItem> &
  Partial<IMenuOptItem>;

// type TMenuList = (IMenuItem | IMenuOptItem) extends

export default Header;
