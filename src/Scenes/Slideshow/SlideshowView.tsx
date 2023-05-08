import ImageView from "./ImageView";
import { Footer } from "./Footer";
import Notification from "./Notification";

import "./slideshow.css";

export const SlideshowView = (props: {
  showNotification: boolean;
  imageUrl?: string;
}) => {
  const { showNotification, imageUrl } = props;

  return (
    <div className="slideshow-view-wrapper">
      <Notification show={showNotification} />

      <ImageView imageUrl={imageUrl} />

      <Footer />
    </div>
  );
};
