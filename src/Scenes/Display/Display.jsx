import React from "react";
import { Link } from "react-router-dom";

import "./display.css";

import { getImages, deleteImage } from "../../api/imageApi";
import ImageView from "./FilteredImageView";
import ConfirmationModal from "./Modal";

const linkStyle = {
  textDecoration: "none"
};

export default function Slideshow() {
  const [images, setImages] = React.useState([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [confirmDeleteImageUrl, setConfirmDeleteImageUrl] = React.useState("");

  React.useEffect(() => {
    getImages().then(res => {
      setImages(res);
    });
  }, []);

  const onDelete = imageUrl => {
    if (isProcessing) return;
    setIsProcessing(true);

    setConfirmDeleteImageUrl(imageUrl);
  };

  const onConfirmationClose = () => {
    setIsProcessing(false);
    setConfirmDeleteImageUrl("");
  };

  const onConfirmation = imageUrl => {
    console.log(":: CONFIRMED ::");

    deleteImage(imageUrl).then(res => {
      console.log("res", res);
      setConfirmDeleteImageUrl("");
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
      {confirmDeleteImageUrl && (
        <ConfirmationModal
          imageUrl={confirmDeleteImageUrl}
          confirmDelete={onConfirmation}
          onClose={onConfirmationClose}
        />
      )}
    </>
  );
}
