import React from "react";

import "./slideshow.css";

const textStyle = {
  color: "black",
  fontFamily: "Optima, sans-serif",
  fontSize: "24px",
  paddingTop: "5px"
};

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <h1 style={textStyle}>
        <i>Anders & Celine 06.06.20 </i>
        <div>(https://andersogceline.com for å laste opp bilder)</div>
      </h1>
    </div>
  );
}
