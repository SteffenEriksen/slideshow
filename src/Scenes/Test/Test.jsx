import React from "react";

import "./Test.css";

const rootStyle = { width: "40%", margin: "auto" };

const topBoxStyle = {
  // marginLeft: "200px",
  // width: "40%",
  borderBottom: "1px solid #ddd"
};

export default function Test() {
  const [open, setOpen] = React.useState(false);
  const [collapseTop, setCollapseTop] = React.useState(false);

  React.useEffect(() => {
    var y = document.getElementById("topDIV");
    var x = document.getElementById("bottomDIV");
    console.log(x);

    y.addEventListener("transitionstart", () => {
      console.log("transitionstart Y");
    });
    y.addEventListener("transitionend", () => {
      console.log("transitionend Y");
    });

    // Standard syntax
    x.addEventListener("transitionstart", () => {
      console.log("transitionstart");
    });
    x.addEventListener("transitionend", () => {
      console.log("transitionend Setting COLLAPSE TOP");
      setCollapseTop(true);
    });
  }, []);

  const MyButton = props => {
    return (
      <button
        id="btnToggleOrderDetails"
        type="button"
        className="btn btn-link toggle-button"
        onClick={() => setOpen(!open)}
      >
        {props.children}
      </button>
    );
  };

  return (
    <div style={rootStyle}>
      <h1>Test</h1>

      <div
        id="topDIV"
        className={"animation-top " + (collapseTop ? "collapse" : "expand")}
      >
        <div style={topBoxStyle}>
          <MyButton>
            <div>
              Some text
              <div className="chevron-logo" />
            </div>
          </MyButton>
        </div>
      </div>

      <div
        id="bottomDIV"
        className={"animation-bottom " + (open ? "expand" : "collapse")}
      >
        asd
      </div>
    </div>
  );
}
