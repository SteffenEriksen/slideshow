import React from "react";

import "./slideshow.css";

export default React.memo(function ImageView(props) {
  return (
    <div
      style={{
        margin: "auto"
        // minHeight: "100vh",
        // maxHeight: "100vh",
        // minWidth: "100vh",
        // maxWidth: "100vh"
      }}
    >
      {props.imageUrl && (
        <img
          id="myImg"
          src={props.imageUrl}
          alt="img_from_blob"
          className="image"
        />
      )}
    </div>
  );
});
