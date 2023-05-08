export const shuffleArray = (array: string[]): void => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export const downloadURI = (uri: string, name: string) => {
  var link = document.createElement("a");
  // If you don't know the name or want to use
  // the webserver default set name = ''
  link.setAttribute("download", name);
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const downloadURI2 = (uri: string, name: string) => {
  fetch(uri)
    .then((resp) => resp.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      // the filename you want
      a.download = name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      // alert("your file has downloaded!"); // or you know, something with better UX...
    })
    .catch(() => alert("oh no!"));
};

export const downloadURI3 = async (uri: string, name: string) => {
  await fetch(uri, { mode: "cors" })
    .then((resp) => resp.blob())
    .then((blob) => {
      // const mimeType = blob.type;
      console.log("INSIDE", blob);

      // Download the blob using a <a> element.
      const a = document.createElement("a");
      a.setAttribute("href", URL.createObjectURL(blob));
      a.setAttribute("download", name);
      a.click();
    })
    .catch((err: any) => console.log("FAIL", err));
};
