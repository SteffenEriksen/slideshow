import React from "react";
import { Link } from "react-router-dom";

import "./display.css";

import { getImages, deleteImage } from "../../api/imageApi";
import ImageView from "./FilteredImageView";
import ConfirmationModal from "./Modal";
import { downloadURI, downloadURI2, downloadURI3 } from "../../helpers";

const linkStyle = {
  textDecoration: "none",
};

export default function Slideshow() {
  const [images, setImages] = React.useState<string[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [confirmDeleteImageUrl, setConfirmDeleteImageUrl] = React.useState("");

  React.useEffect(() => {
    getImages().then((res) => {
      setImages(res);
    });
  }, []);

  const downloadAll = () => {
    const img1 = images[0];
    const name = img1.split("/").pop()?.split("__")[0] || "";
    console.log("name", name);
    downloadURI(img1, name);
  };

  const downloadAll2 = () => {
    const img1 = images[0];
    const name = img1.split("/").pop()?.split("__")[0] || "";
    console.log("name", name);
    downloadURI2(img1, name);
  };

  const downloadAll3 = () => {
    const img1 = images[0];
    const name = img1.split("/").pop()?.split("__")[0] || "";
    console.log("name", name);
    downloadURI3(img1, name);

    // images.map((imageUrl, idx) => {
    //   const name = imageUrl.split("/").pop()?.split("__")[0] || `${idx}`;
    //   console.log("name", name);
    //   downloadURI3(imageUrl, name);
    // });
  };

  const onDelete = (imageUrl: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    setConfirmDeleteImageUrl(imageUrl);
  };

  const onConfirmationClose = () => {
    setIsProcessing(false);
    setConfirmDeleteImageUrl("");
  };

  const onConfirmation = (imageUrl: string) => {
    console.log(":: CONFIRMED ::");

    deleteImage(imageUrl).then((res) => {
      console.log("res", res);
      setConfirmDeleteImageUrl("");
      setIsProcessing(false);
      setImages(res);
    });
  };

  return (
    <>
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
      <div>
        <button style={{ cursor: "pointer" }} onClick={downloadAll}>
          Download all
        </button>
        <button style={{ cursor: "pointer" }} onClick={downloadAll2}>
          Download all2
        </button>
        <button style={{ cursor: "pointer" }} onClick={downloadAll3}>
          Download all3
        </button>
      </div>
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
