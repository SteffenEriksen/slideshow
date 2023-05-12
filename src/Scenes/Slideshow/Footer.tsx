import { CSSProperties } from "react";
import "./slideshow.css";

const textStyle: CSSProperties = {
  color: "black",
  fontFamily: "Optima, sans-serif",
  fontSize: "24px",
  margin: "0",
  // paddingTop: "5px",
};

export const Footer = () => {
  return (
    <div
      className="footer-wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
      }}
    >
      <div style={{ width: "120px" }} />

      <h1 style={textStyle}>
        <i>Anders & Celine 07.07.23</i>
      </h1>

      <div className="qrcode-content" />
    </div>
  );
};
