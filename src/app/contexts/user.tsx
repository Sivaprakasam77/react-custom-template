import React from "react";
import * as Api from "src/api";
import * as Constants from "src/constants";

// User detail storage contexts
export const UserContext = React.createContext<userContext.User | undefined>(
  undefined
);

// User details Contexts provider and detail store
export const UserProvider = ({ children }: children) => {
  const [state, updateState] = React.useState(false);
  const [country, setCountry] = React.useState("");
  const { data: user, isFetching: loading } = Api.Server.useRequest(
    [window.accessToken || "", state as unknown as string],
    "getProfile"
  );

  // Retrigger GetProfile API
  const update = () => updateState(!state);

  // Get User current country
  React.useEffect(() => {
    Api.Server.Request({
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
