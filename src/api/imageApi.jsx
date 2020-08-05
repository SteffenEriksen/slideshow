const axios = require("axios");

const baseUrl = "https://ac-upload-backend.azurewebsites.net";
// const baseUrl = "https://localhost:44350";

const imageApiUrl = `${baseUrl}/api/image`;

function getAuthHeaders(headers) {
  if (headers === undefined) {
    headers = new Headers();
  }

  headers.append("Content-Type", "multipart/form-data; boundary");

  // headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', `Bearer ${sessionInfo.token}`);

  return headers;
}

export function getImages() {
  return axios.get(imageApiUrl).then(resp => {
    // console.log(resp.data);
    return resp.data;
  });
}

export function getImage(number) {
  return axios.get(`${imageApiUrl}/GetImage?number=${number}`).then(resp => {
    // console.log(resp.data);
    return resp.data;
  });
}

export function postImages(data) {
  const headers = getAuthHeaders();

  return axios
    .post(imageApiUrl, data, headers)
    .then(resp => {
      // console.log(resp.data);
      return resp.data;
    })
    .catch(err => console.log(err));
}

export function deleteImage(imageUrl) {
  return axios
    .delete(`${imageApiUrl}/?imageUrl=${imageUrl}`)
    .then(resp => {
      return resp.data;
    })
    .catch(err => console.log(err));
}

export function uploadImagesXhr(data) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", imageApiUrl);

    xhr.onreadystatechange = function() {
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

    xhr.upload.addEventListener("progress", pEvent => {
      let progress = pEvent.loaded / pEvent.total;
      console.log(progress);
    });

    xhr.send(data);
  });
}
