import React from "react";
import * as signalR from "@microsoft/signalr";

import "./slideshow.css";
import { getImages } from "../../api/imageApi";
import { baseUrl } from "../../constants";
import ImageView from "./ImageView";
import Footer from "./Footer";
import Notification from "./Notification";

const timeBetweenPictures = 10000;
let connectedToSignalR = false;

export default function Slideshow() {
  const [loadNewImage, setLoadNewImage] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState("");
  const [backendImages, setBackendImages] = React.useState([]);
  const [newlyUpdatedImages, setNewlyUpdatedImages] = React.useState([]);
  const [showNotification, setShowNotification] = React.useState(false);

  const hubUrl = `${baseUrl}/imageHub`;
  let connection = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();

  const shuffleArray = (array) => {
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
          connection.on("UploadedImage", (newImages) => {
            console.log("on uploaded image");
            setLoadNewImage(false);
            setNewlyUpdatedImages((prevState) => [...prevState, ...newImages]);
            setShowNotification(true);
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          });
        })
        .catch((err) => {
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
      getImages().then((res) => {
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
    zIndex: "-1",
  };

  const Heart = ({ left, top }) => (
    <div className="heart-one" style={{ ...heartStyle, left, top }} />
  );

  return (
    <>
      <Notification show={showNotification} />

      <Heart left="15%" top="20%" />
      <Heart left="20%" top="30%" />
      <Heart left="6%" top="38%" />
      <Heart left="8%" top="60%" />
      <Heart left="3%" top="80%" />
      <ImageView imageUrl={imageUrl} />
      <Heart left="82%" top="20%" />
      <Heart left="77%" top="30%" />
      <Heart left="91%" top="38%" />
      <Heart left="89%" top="60%" />
      <Heart left="94%" top="80%" />

      {/* <button
        style={{ zIndex: "4", position: "fixed", top: "1%" }}
        onClick={() => setShowNotification(!showNotification)}
      >
        test
      </button> */}

      <Footer />
    </>
  );
}

const isSlidePage = () =>
  window.location.href === `${window.location.origin}/slide`;
