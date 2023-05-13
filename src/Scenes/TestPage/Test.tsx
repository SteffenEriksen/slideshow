import React from "react";
import { Link } from "react-router-dom";

import { getImages } from "../../api/imageApi";
import {
  downloadURI,
  downloadURI2,
  downloadURI3,
} from "../../utilities/helpers";

const linkStyle = {
  textDecoration: "none",
};

export const Test = () => {
  const [images, setImages] = React.useState<string[]>([]);

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
      <h1>Test</h1>
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
    </>
  );
};
