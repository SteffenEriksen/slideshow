const apiUrlLocal = "https://localhost:44350";
const apiUrlProd = "https://ac-upload-back.azurewebsites.net";
const useLocalhost = false;
const apiUrl =
  window.location?.hostname === "localhost" && useLocalhost
    ? apiUrlLocal
    : apiUrlProd;

export const imageApiUrl = `${apiUrl}/api/image`;
export const hubUrl = `${apiUrl}/imageHub`;

export const linkToUploadPage = "https://ac-up.azurewebsites.net";

export const defaultTimeBetweenSlides = 7;
