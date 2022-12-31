import * as Axios from "axios";

export const Routes: {
  [key: string]: Pick<Axios.AxiosRequestConfig, "method" | "url" | "baseURL">;
} = {
  fileUpload: { url: "", method: "post" },
  getProfile: { url: "", method: "post" },
};
