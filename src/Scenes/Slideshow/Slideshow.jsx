import React from "react";
import * as signalR from "@aspnet/signalr";

import "./slideshow.css";
import { getImages } from "../../api/imageApi";
import ImageView from "./ImageView";
import Footer from "./Footer";
import { SlideshowView } from "./SlideshowView";
import Notification from "./Notification";

const timeBetweenPictures = 7000;
let connectedToSignalR = false;

export default function Slideshow() {
  const [loadNewImage, setLoadNewImage] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState("");
  const [backendImages, setBackendImages] = React.useState([]);
  const [newlyUpdatedImages, setNewlyUpdatedImages] = React.useState([]);
  const [showNotification, setShowNotification] = React.useState(false);

  const baseUrl = "https://ac-upload-backend.azurewebsites.net";

  const hubUrl = `${baseUrl}/imageHub`;
  let connection = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();

  const shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  React.useEffect(() => {
    // console.log("connection", connection);
    if (connectedToSignalR) return;
    connectedToSignalR = true;

    console.log("INSIDE");

    const startSignalR = () => {
      connection.methods = [];
      connection
        .start()
        .then(() => {
          console.log("connected to signalR");
          connection.on("UploadedImage", newImages => {
            console.log("on uploaded image");
            setLoadNewImage(false);
            setNewlyUpdatedImages(prevState => [...prevState, ...newImages]);
            setShowNotification(true);
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          });
        })
        .catch(err => {
          console.log("DISCONNECTED ?", err);
        });
    };

    startSignalR();
    connection.onclose(() => {
      connection.start().then(() => console.log("reconnected signalR"));
    });

    return () => {
      connection.methods = [];
    };
  }, [connection]);

  React.useEffect(() => {
    if (!loadNewImage) return;

    if (newlyUpdatedImages && newlyUpdatedImages.length > 0) {
      console.log("====== newlyUpdatedImages ======");
      var tempNewImages = newlyUpdatedImages;
      var nextNewImageUrl = tempNewImages.pop();

      setLoadNewImage(false);
      setImageUrl(nextNewImageUrl);
      setNewlyUpdatedImages(tempNewImages);

      if (isSlidePage()) {
        setTimeout(() => setLoadNewImage(true), timeBetweenPictures);
      }
    } else if (backendImages && backendImages.length > 0) {
      console.log("====== use BACKEND image ======");
      var tempOldBackendImages = backendImages;
      var nextOldImageUrl = tempOldBackendImages.pop();

      setLoadNewImage(false);
      setImageUrl(nextOldImageUrl);
      setBackendImages(tempOldBackendImages);

      if (isSlidePage())
        setTimeout(() => {
          setLoadNewImage(true);
        }, timeBetweenPictures);
    } else {
      console.log("====== retrieve BACKEND ======");
      getImages().then(res => {
        shuffleArray(res);
        var shuffledList = res;
        var tempImages = shuffledList;
        var nextImageUrl = tempImages.pop();

        setLoadNewImage(false);
        setImageUrl(nextImageUrl);
        setBackendImages(tempImages);

        if (isSlidePage())
          setTimeout(() => {
            setLoadNewImage(true);
          }, timeBetweenPictures);
      });
    }
  }, [loadNewImage, newlyUpdatedImages, backendImages]);

  const heartStyle = {
    height: "50px",
    width: "60px",
    position: "fixed",
    zIndex: "-1"
  };

  const Heart = ({ left, top }) => (
    <div className="heart-one" style={{ ...heartStyle, left, top }} />
  );

  return (
    <SlideshowView showNotification={showNotification} imageUrl={imageUrl} />
  );
}

const isSlidePage = () =>
  window.location.href === `${window.location.origin}/slide`;
