import React, { HTMLAttributes } from "react";
import "./Modal.css";

function Modal(props: HTMLAttributes<HTMLDivElement> & { name?: string }) {
  const childrenButtons: React.ReactNode[] = [];
  const childrenWithoutButtons: React.ReactNode[] = [];

  if (Array.isArray(props.children)) {
    props.children.forEach((child: React.ReactElement, index: number) => {
      if (!child.type)
        return childrenWithoutButtons.push(
          <p className="Modal-tesxt" key={index}>
            {child}
          </p>
        );

      if (typeof child.type !== "string") {
        const modificChild = React.cloneElement(child, {
          ...child.props,
          key: index,
        });

        if (child.type?.name === "Button") childrenButtons.push(modificChild);
        else childrenWithoutButtons.push(modificChild);
      }
    });
  }
  return (
    <div className={"Modal " + props.className}>
      <div className="Modal-content">
        <div className="Modal-centered">
          {props.name && <div className="Modal-name">{props.name}</div>}
          {childrenWithoutButtons.map((child: React.ReactNode) => (
            <>{child}</>
          ))}
        </div>
        {childrenButtons.map((child: React.ReactNode) => (
          <>{child}</>
        ))}
      </div>
    </div>
  );
}

export default Modal;
