import React, { HTMLAttributes, useEffect, useState } from "react";
import "./Alert.css";
import { UI } from "../main";

function Alert(
  props: HTMLAttributes<HTMLDivElement> & {
    name?: string;
    message: string;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
  }
) {
  const [cssClasses, setCssClasses] = useState<string[]>([]);

  useEffect(() => {
    const newCssClasses = ["Alert", "mount"];
    if (props.className) newCssClasses.push(...props.className.split(" "));
    setCssClasses(newCssClasses);

    return () => {
      const newCssClasses = ["Alert", "unmount"];
      if (props.className) newCssClasses.push(...props.className.split(" "));
      setCssClasses(newCssClasses);
      console.log("hello");
    };
  }, []);

  return (
    <div className={cssClasses.join(" ")}>
      <UI.Modal name={props.name} className="active">
        {props.message}
        <UI.Button
          onClick={(e) => {
            props.setError("");
          }}
        >
          ok
        </UI.Button>
      </UI.Modal>
    </div>
  );
}

export default Alert;
