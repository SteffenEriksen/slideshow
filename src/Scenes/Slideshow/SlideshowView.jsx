import ImageView from "./ImageView";
import { Footer } from "./Footer";
import Notification from "./Notification";

import "./slideshow.css";

// const heartStyle = {
//   height: "50px",
//   width: "60px",
//   position: "fixed",
//   zIndex: "-1"
// };

// const Heart = ({ left, top }) => (
//   <div className="heart-one" style={{ ...heartStyle, left, top }} />
// );

export const SlideshowView = (props) => {
  const { showNotification, imageUrl } = props;

  return (
    <div className="slideshow-view-wrapper">
      <Notification show={showNotification} />

      {/* <Heart left="15%" top="20%" />
      <Heart left="20%" top="30%" />
      <Heart left="6%" top="38%" />
      <Heart left="8%" top="60%" />
      <Heart left="3%" top="80%" /> */}
      <ImageView imageUrl={imageUrl} />
      {/* <Heart left="82%" top="20%" />
      <Heart left="77%" top="30%" />
      <Heart left="91%" top="38%" />
      <Heart left="89%" top="60%" />
      <Heart left="94%" top="80%" /> */}

      <Footer />
    </div>
  );
};
