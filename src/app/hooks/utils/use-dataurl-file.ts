export const useDataURLFile = (dataURL: string, fileName: string) => {
  var byteString = atob(dataURL.split(",")[1]);
  var mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  var ab = new ArrayBuffer(byteString.length);
  var dw = new DataView(ab);
  for (var i = 0; i < byteString.length; i++)
    dw.setUint8(i, byteString.charCodeAt(i));
  const blob = new Blob([ab], { type: mimeString });
  return new File([blob], `${fileName}.${blob.type.split("/").slice(-1)[0]}`, {
    type: blob.type,
    lastModified: new Date().getTime(),
  });
};
