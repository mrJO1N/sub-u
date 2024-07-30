import React, { HTMLAttributes } from "react";
import "./Modal.css";

function Modal(props: HTMLAttributes<HTMLDivElement> & { name?: string }) {
  const noCentredChild: React.ReactNode[] = [];
  const centredChild: React.ReactNode[] = [];

  if (Array.isArray(props.children)) {
    props.children.forEach((child: React.ReactElement, index: number) => {
      if (!child.type) return centredChild.push(<p key={index}>{child}</p>);

      const modificChild = React.cloneElement(child, {
        ...child.props,
        key: index,
      });

      if (typeof child.type === "string" || !(child.type instanceof Function))
        return noCentredChild.push(modificChild);

      if (["Button"].includes(child.type?.name))
        noCentredChild.push(modificChild);
      else centredChild.push(modificChild);
    });
  }

  return (
    <div className={"Modal " + props.className}>
      <div className="Modal-content">
        <div className="Modal-centered">
          {props.name && <div className="Modal-name">{props.name}</div>}

          {centredChild.map((child: React.ReactNode) => (
            <>{child}</>
          ))}
        </div>
        {noCentredChild.map((child: React.ReactNode) => (
          <>{child}</>
        ))}
      </div>
    </div>
  );
}

export default Modal;
