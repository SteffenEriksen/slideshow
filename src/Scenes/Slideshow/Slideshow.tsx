import React from "react";
import * as signalR from "@microsoft/signalr";

import "./slideshow.css";
import { getImages } from "../../api/imageApi";
import { defaultTimeBetweenSlides, hubUrl } from "../../utilities/constants";
import { SlideshowView } from "./SlideshowView";
import { shuffleArray } from "../../utilities/helpers";
import { AppContext } from "../../store/AppContext";

let connectedToSignalR = false;

export const Slideshow = () => {
  const { appState } = React.useContext(AppContext);

  const [loadNewImage, setLoadNewImage] = React.useState<boolean>(true);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [backendImages, setBackendImages] = React.useState<string[]>([]);
  const [newlyUpdatedImages, setNewlyUpdatedImages] = React.useState<string[]>(
    []
  );
  const [showNotification, setShowNotification] = React.useState(false);

  const timeBetweenSlides =
    (appState.timeBetweenSlides || defaultTimeBetweenSlides) * 1000;
  let connection = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();

  console.log("TIME BETWEEN", timeBetweenSlides);

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
        setTimeout(() => setLoadNewImage(true), timeBetweenSlides);
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
        }, timeBetweenSlides);
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
          }, timeBetweenSlides);
      });
    }
  }, [loadNewImage, newlyUpdatedImages, backendImages, timeBetweenSlides]);

  return (
    <SlideshowView showNotification={showNotification} imageUrl={imageUrl} />
  );
};

const isSlidePage = () =>
  window.location.href === `${window.location.origin}/slide`;
