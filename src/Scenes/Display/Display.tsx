import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./display.css";

import { getImages, deleteImage, getZippedImages } from "../../api/imageApi";
import ImageView from "./FilteredImageView";
import ConfirmationModal from "./Modal";
import { AppContext, setTimeBetweenSlides } from "../../store/AppContext";

const linkStyle = {
  textDecoration: "none",
};

export const Display = () => {
  const { appState, dispatch } = React.useContext(AppContext);
  const [images, setImages] = React.useState<string[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [confirmDeleteImageUrl, setConfirmDeleteImageUrl] = React.useState("");

  React.useEffect(() => {
    getImages().then((res) => {
      setImages(res);
    });
  }, []);

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

      <div
        style={{
          margin: "30px 0",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Time between slides"
          variant="outlined"
          onChange={(e) =>
            dispatch(setTimeBetweenSlides(e.currentTarget.value))
          }
          value={appState.timeBetweenSlides}
        />

        <Button variant="contained" onClick={getZippedImages}>
          Download all images
        </Button>
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
};
