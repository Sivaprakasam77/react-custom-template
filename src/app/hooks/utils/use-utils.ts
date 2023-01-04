import copy from "copy-to-clipboard";
import * as Providers from "src/app/providers";

// Some cusotm utils for app
export const useUtils = () => {
  const handler = Providers.useCustomHandler;

  // Content copy utils with conetnt and success message
  const contentCopy = (content: string, message?: string) => {
    copy(content);
    handler({
      message: message || "Copied!",
      variant: "success",
    });
  };

  // Use data URL to file convertor
  const useDataURLFile = (dataURL: string, fileName: string) => {
    var byteString = atob(dataURL.split(",")[1]);
    var mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var dw = new DataView(ab);
    for (var i = 0; i < byteString.length; i++)
      dw.setUint8(i, byteString.charCodeAt(i));
    const blob = new Blob([ab], { type: mimeString });
    return new File(
      [blob],
      `${fileName}.${blob.type.split("/").slice(-1)[0]}`,
      {
        type: blob.type,
        lastModified: new Date().getTime(),
      }
    );
  };

  // Focusing elemnt
  const toFocus = (element: HTMLElement | null) => {
    if (element) {
      element.focus();
      element.scrollIntoView({ block: "center" });
    }
  };

  // To convert file to Base64
  const toBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return { contentCopy, useDataURLFile, toFocus, toBase64 };
};
