import React from "react";
import { Link } from "react-router-dom";

import "./display.css";

import { getImages, deleteImage } from "../../api/imageApi";
import ImageView from "./FilteredImageView";

const linkStyle = {
  textDecoration: "none"
};

export default function Slideshow() {
  const [images, setImages] = React.useState([]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  React.useEffect(() => {
    getImages().then(res => {
      setImages(res);
    });
  }, []);

  const onDelete = imageUrl => {
    if (isProcessing) return;
    setIsProcessing(true);

    deleteImage(imageUrl).then(res => {
      console.log("res", res);
      setIsProcessing(false);
      setImages(res);
    });
  };

  return (
    <>
      {" "}
      <Link style={linkStyle} to="/">
        Home{" - "}
      </Link>
      <Link style={linkStyle} to="/slide">
        Slide{" - "}
      </Link>
      <Link style={linkStyle} to="/upload">
        Upload{" "}
      </Link>
      <h1>Display</h1>
      {images && (
        <div className="display-container">
          {images.map((imageUrl, idx) => (
            <ImageView key={idx} imageUrl={imageUrl} onDelete={onDelete} />
          ))}
        </div>
      )}
    </>
  );
}
