// export const apiUrl = "https://localhost:44350";
const apiUrl = "https://ac-upload-back.azurewebsites.net";
const imageApiUrl = `${apiUrl}/api/image`;
export const hubUrl = `${apiUrl}/imageHub`;

export const apiPaths = {
  getImages: imageApiUrl,
  getImage: (number: number) => `${imageApiUrl}/GetImage?number=${number}`,
  postImages: imageApiUrl,
  deleteImage: (imageUrl: string) => `${imageApiUrl}/?imageUrl=${imageUrl}`,
};

export const linkToUploadPage = "https://ac-up.azurewebsites.net";
