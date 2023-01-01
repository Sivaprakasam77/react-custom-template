import * as FirebaseStorage from "firebase/storage";
import React from "react";
import * as Api from "src/api";
import * as Providers from "src/app/providers";

// File stoarge access
export const useFileUpload = () => {
  const [link, setLink] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  // Clear link variable
  const clear = () => setLink("");

  // upload file to server
  const uploadToServer = async (file: File) => {
    setLoading(true);
    var bodyData = new FormData();
    bodyData.append("file", file);
    return await Api.Server.Request("fileUpload", bodyData)
      .then((res) => {
        setLink(res.data.imageURL);
        return res.data.imageURL;
      })
      .finally(() => setLoading(false));
  };

  // const upload to firestore
  const uploadToFirestore = async (image: string, path: string) => {
    setLoading(true);
    const secondaryStorage = FirebaseStorage.getStorage(Providers.secondaryApp);
    const ref = FirebaseStorage.ref(secondaryStorage, path);
    const result = await FirebaseStorage.uploadString(ref, image, "data_url");
    const imageURL = await FirebaseStorage.getDownloadURL(result.ref);
    setLink(imageURL);
    setLoading(false);
    return imageURL;
  };

  return { loading, link, uploadToServer, uploadToFirestore, clear };
};
