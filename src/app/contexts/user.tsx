import React from "react";
import * as Api from "src/api";
import * as Constants from "src/constants";

export const UserContext = React.createContext<userContext.User | undefined>(
  undefined
);

export const UserProvider = ({ children }: children) => {
  const { Request, useRequest } = Api.Server.serverRequest();
  const [state, updateState] = React.useState(false);
  const [country, setCountry] = React.useState("");
  const { data: user, isFetching: loading } = useRequest(
    [window.accessToken || "", state as unknown as string],
    "getProfile"
  );

  const update = () => updateState(!state);

  React.useEffect(() => {
    Request({
      baseURL: Constants.API_CONFIG.geoLocationAPI,
      url: "/geo/location",
      method: "get",
    }).then((res) => setCountry(res.country));
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...(user?.userDetails as userContext.User),
        detected_country: country,
        loading,
        update,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export declare namespace userContext {
  export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    detected_country?: string;
    loading?: boolean;
    update: () => void;
  }
}
