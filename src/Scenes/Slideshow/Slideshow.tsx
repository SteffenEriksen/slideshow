import React from "react";
import * as signalR from "@microsoft/signalr";

import "./slideshow.css";
import { getImages } from "../../api/imageApi";
import { hubUrl } from "../../constants";
import { SlideshowView } from "./SlideshowView";
import { shuffleArray } from "../../helpers";
// import ImageView from "./ImageView";
// import Footer from "./Footer";
// import Notification from "./Notification";

const timeBetweenPictures = 7000;
let connectedToSignalR = false;

export default function Slideshow() {
  const [loadNewImage, setLoadNewImage] = React.useState<boolean>(true);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [backendImages, setBackendImages] = React.useState<string[]>([]);
  const [newlyUpdatedImages, setNewlyUpdatedImages] = React.useState<string[]>(
    []
  );
  const [showNotification, setShowNotification] = React.useState(false);

  let connection = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();

  React.useEffect(() => {
    // console.log("connection", connection);
    if (connectedToSignalR) return;
    connectedToSignalR = true;

    console.log("INSIDE");

    const startSignalR = () => {
      (connection as any).methods = [];
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
      (connection as any).methods = [];
    };
  }, [connection]);

  React.useEffect(() => {
    if (!loadNewImage) return;

    if (newlyUpdatedImages && newlyUpdatedImages.length > 0) {
      console.log("====== newlyUpdatedImages ======");
      var tempNewImages = newlyUpdatedImages;
      var nextNewImageUrl = tempNewImages.pop() || "";

      setLoadNewImage(false);
      setImageUrl(nextNewImageUrl);
      setNewlyUpdatedImages(tempNewImages);

      if (isSlidePage()) {
        setTimeout(() => setLoadNewImage(true), timeBetweenPictures);
      }
    } else if (backendImages && backendImages.length > 0) {
      console.log("====== use BACKEND image ======");
      var tempOldBackendImages = backendImages;
      var nextOldImageUrl = tempOldBackendImages.pop() || "";

      setLoadNewImage(false);
      setImageUrl(nextOldImageUrl);
      setBackendImages(tempOldBackendImages);

      if (isSlidePage())
        setTimeout(() => {
          setLoadNewImage(true);
        }, timeBetweenPictures);
    } else {
      console.log("====== retrieve BACKEND ======");
      getImages().then((res: string[]) => {
        shuffleArray(res);
        var shuffledList = res;
        var tempImages = shuffledList;
        var nextImageUrl = tempImages.pop() || "";

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

  // const heartStyle = {
  //   height: "50px",
  //   width: "60px",
  //   position: "fixed",
  //   zIndex: "-1",
  // };

  // const Heart = ({ left, top }) => (
  //   <div className="heart-one" style={{ ...heartStyle, left, top }} />
  // );

  return (
    <SlideshowView showNotification={showNotification} imageUrl={imageUrl} />
  );
}

const isSlidePage = () =>
  window.location.href === `${window.location.origin}/slide`;
