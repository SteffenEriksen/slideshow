import { CSSProperties } from "react";
import "./slideshow.css";

const textStyle: CSSProperties = {
  color: "black",
  // fontFamily: "Optima, sans-serif",
  fontFamily: "Parisienne",
  fontSize: "24px",
  // margin: "0",
  fontWeight: "400",
  // fontSize: "3.5rem",
  lineHeight: "1.25",
  textTransform: "none",
  letterSpacing: "0em",

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

      <h1 style={textStyle}>Anders & Celine 07.07.23</h1>

      <div className="qrcode-content" />
    </div>
  );
};
