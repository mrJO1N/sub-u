import React, { HTMLAttributes } from "react";
import { IMenuItem } from "../types";
import { Link } from "react-router-dom";
import "../styles/DropDownMenu.css";

function DropDownMenu(
  props: HTMLAttributes<HTMLDivElement> & {
    target: string;
    options: { url: string; label: string }[];
  }
) {
  const addictTarget = props.target.replace(/\./g, ".dropdown_");

  return (
    <div className={"dropdown-root " + addictTarget.replace(/\./g, "")}>
      <style>{``}</style>

      {props.children}
      <div className="dropdown-content">
        {props.options.map((menuItem: IMenuItem, index: number) => (
          <Link
            key={index}
            to={menuItem.url}
            className="dropdown-item"
            target={props.target}
          >
            {menuItem.label}
          </Link>
        ))}
      </div>

      {/* <ul>
        {!!Array.isArray(props.children)
          ? props.children.map((child: React.ReactElement) => {
              return <li>{child}</li>;
            })
          : props.children}
      </ul> */}
    </div>
  );
}

interface IDropDownMenuItem {}

export default DropDownMenu;
