const apiUrlLocal = "https://localhost:44350";
const apiUrlProd = "https://ac-upload-back.azurewebsites.net";
const apiUrl =
  window.location?.hostname === "localhost" ? apiUrlLocal : apiUrlProd;

const imageApiUrl = `${apiUrl}/api/image`;
export const hubUrl = `${apiUrl}/imageHub`;

export const apiPaths = {
  getImages: imageApiUrl,
  GetAllImages: `${imageApiUrl}/GetAllImages`,
  GetZippedImages: `${imageApiUrl}/GetZippedImages`,
  postImages: imageApiUrl,
  deleteImage: (imageUrl: string) => `${imageApiUrl}/?imageUrl=${imageUrl}`,
};

export const linkToUploadPage = "https://ac-up.azurewebsites.net";

export const defaultTimeBetweenSlides = 7;
