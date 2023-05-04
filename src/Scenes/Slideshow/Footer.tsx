import { CSSProperties } from "react";
import { QrCode } from "./QrCode";
import "./slideshow.css";

const textStyle: CSSProperties = {
  color: "black",
  fontFamily: "Optima, sans-serif",
  fontSize: "24px",
  // paddingTop: "5px",
};

const qrCodeStyle: CSSProperties = {
  height: "60px",
  width: "60px",
};

export const Footer = () => {
  return (
    <div className="footer-wrapper">
      <h1 style={textStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div />
          <i style={{ alignSelf: "center" }}>Anders & Celine 07.07.23</i>
          <div style={qrCodeStyle}>
            <QrCode />
          </div>
        </div>
      </h1>
    </div>
  );
};
