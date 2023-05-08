import React from "react";

import "./display.css";

export default React.memo(function ImageView(props: {
  imageUrl: string;
  onDelete: (imageUrl: string) => void;
}) {
  return (
    <div className="display-item">
      {props.imageUrl && (
        <>
          <i
            className="fa fa-close close"
            onClick={() => props.onDelete(props.imageUrl)}
          />
          <a href={props.imageUrl} download>
            <img
              id="myImg"
              src={props.imageUrl}
              alt="img_from_blob"
              className="filteredimage"
            />
          </a>
        </>
      )}
    </div>
  );
});
