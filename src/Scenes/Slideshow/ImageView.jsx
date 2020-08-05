import React from "react";

import "./slideshow.css";

export default React.memo(function ImageView(props) {
  return (
    <div className="image-view-wrapper">
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
