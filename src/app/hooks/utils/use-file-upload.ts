import React from "react";
import * as Api from "src/api";

export const useFileUpload = () => {
  const { Request } = Api.Server.serverRequest();
  const [link, setLink] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);
  const upload = async (file: File) => {
    var bodyData = new FormData();
    bodyData.append("file", file);
    setLoading(true);
    return await Request("fileUpload", bodyData)
      .then((res) => {
        setLink(res.data.imageURL);
        return res.data.imageURL;
      })
      .finally(() => setLoading(false));
  };
  return { loading, link, upload, setLink };
};
