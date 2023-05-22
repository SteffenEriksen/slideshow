import axios from "axios";

import { downloadURI } from "../utilities/helpers";
import { imageApiUrl } from "../utilities/constants";

const apiPaths = {
  getImages: imageApiUrl,
  GetAllImages: `${imageApiUrl}/GetAllImages`,
  GetZippedImages: `${imageApiUrl}/GetZippedImages`,
  GetZippedImagesExtra: `${imageApiUrl}/GetZippedImagesExtra`,
  postImages: imageApiUrl,
  deleteImage: (imageUrl: string) => `${imageApiUrl}/?imageUrl=${imageUrl}`,
};

const getAuthHeaders = (headers?: Headers): any => {
  if (headers === undefined) {
    headers = new Headers();
  }

  headers.append("Content-Type", "multipart/form-data; boundary");

  // headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', `Bearer ${sessionInfo.token}`);

  return headers;
};

export const getImages = () => {
  return axios.get(apiPaths.getImages).then((resp) => {
    // console.log(resp.data);
    return resp.data;
  });
};

export const getZippedImages = () => {
  return axios
    .get(apiPaths.GetZippedImages, { responseType: "arraybuffer" })
    .then((resp) => {
      console.log(resp.data);
      const blob = new Blob([resp.data], {
        type: "application/zip",
      });
      const url = window.URL.createObjectURL(blob);

      downloadURI(url, "images.zip");
    });
};

export const postImages = (data: any) => {
  const headers = getAuthHeaders();

  return axios
    .post(apiPaths.postImages, data, headers)
    .then((resp) => {
      // console.log(resp.data);
      return resp.data;
    })
    .catch((err) => console.log(err));
};

export const deleteImage = (imageUrl: string) => {
  return axios
    .delete(apiPaths.deleteImage(imageUrl))
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => console.log(err));
};

export const uploadImagesXhr = (data: any) => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", apiPaths.postImages);

    xhr.onreadystatechange = function () {
      console.log(xhr.status, xhr.readyState);
      if (xhr.readyState === 4 && xhr.status === 200) {
        let result = xhr.responseText;
        if (result === "OK") {
          resolve(true);
        }
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        reject("error");
      }
    };

    xhr.upload.addEventListener("progress", (pEvent) => {
      let progress = pEvent.loaded / pEvent.total;
      console.log(progress);
    });

    xhr.send(data);
  });
};
