import React, { HTMLAttributes } from "react";
import "./Modal.css";

function Modal(props: HTMLAttributes<HTMLDivElement> & { name?: string }) {
  return (
    <div className={"Modal " + props.className}>
      <div className="Modal-content">
        {props.name && <div className="Modal-name">{props.name}</div>}
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
