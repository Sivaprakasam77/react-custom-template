import * as Axios from "axios";
import * as ReactQuery from "react-query";
import * as Requests from "./request-routes";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";

// React query API provider
export const Main = ({ children }: children) => {
  const queryClient = new ReactQuery.QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <ReactQuery.QueryClientProvider client={queryClient}>
      {children}
    </ReactQuery.QueryClientProvider>
  );
};

// API config clients
const formOptions: string[] = [];

const client = Axios.default.create({
  baseURL: `${Constants.API_CONFIG.baseURL}`,
});

// API call provider
export const serverRequest = () => {
  const { data: offlineData, handleDB } = Hooks.Utils.useIndexedDB<
    Record<string, string>
  >(window.accessToken, Constants.TableName, Constants.ID, Constants.IndexID);

  // Single API call
  const Request = (
    options: string | Axios.AxiosRequestConfig,
    data?: object,
    headers?: Axios.RawAxiosRequestHeaders
  ) => {
    // Readall data from storage
    handleDB("readall");

    // Development console logs
    const startAt = performance.now();
    if (import.meta.env.MODE === "development")
      console.info(`${options} Request`, data);

    //  Develope Request and Header options
    const requestOptions: Axios.AxiosRequestConfig =
      typeof options === "string" ? Requests.Routes[options] : options;
    const contentType =
      typeof options === "string" && formOptions.indexOf(options) > -1
        ? "multipart/form-data"
        : "application/json";
    const option = `${requestOptions.url}`.split("/").slice(-1)[0];

    // API call initiate
    return client({
      ...requestOptions,
      headers: {
        "Content-Type": contentType,
        ...headers,
      },
      data,
    })
      .then((res) => {
        // Development console logs
        import.meta.env.MODE === "development" &&
          console.info(
            `${options} Response Timing ${performance.now() - startAt}ms`,
            res.data
          );

        // Store access token for Login option
        if (typeof options === "string" && options.includes("login")) {
          window.accessToken = res.data.accessToken;
        } else {
          // Store Response for offline support
          handleDB("insert", [
            {
              [option]: JSON.stringify(res.data),
              option,
            },
          ]);
        }

        // Retrun Reponse
        return res.data;
      })
      .catch(() =>
        window.accessToken ? offlineData?.[0]?.[option] : undefined
      );
  };

  // Query API call
  const useRequest = (queryOptions: string[], options: string, data?: object) =>
    ReactQuery.useQuery(queryOptions, () => Request(options, data));

  return { Request, useRequest };
};
