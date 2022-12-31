import copy from "copy-to-clipboard";
import * as Providers from "src/app/providers";

export const useUtils = () => {
  const handler = Providers.useCustomHandler;

  const contentCopy = (wid: string, message?: string) => {
    copy(wid);
    handler({
      message: message || "Copied!",
      variant: "success",
    });
  };

  return { contentCopy };
};
