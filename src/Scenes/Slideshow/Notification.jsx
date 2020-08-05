import React from "react";

import "./slideshow.css";

export default function Notification(props) {
  const { show } = props;

  var showBox = show ? "noti-show" : "noti-hide";
  // var showText = show ? "noti-text-show" : "noti-text-hide";

  // React.useEffect(() => {
  //   if (props.show)  {

  //   }
  // }, [props.show]);

  return (
    <div className={`noti ${showBox} `}>
      {/* <span className={showText}>new</span> */}
      <div className="noti-content">
        {/* <span className={showText}>1</span> */}
      </div>
    </div>
  );
}
