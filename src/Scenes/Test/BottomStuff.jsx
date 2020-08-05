import React from "react";

import "./Test.css";

export default function BottomStuff(props) {
  return (
    <>
      <div className={"animation-high-down" + (props.open ? " expand" : "")}>
        asd
      </div>
    </>
  );
}
