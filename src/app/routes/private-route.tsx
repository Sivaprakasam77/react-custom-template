import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";

export const Private = ({ protect, children }: route.Type) => {
  const user = React.useContext(Contexts.UserContext);

  if (user?.loading)
    return <Components.Global.GlobalLoader sx={{ position: "absolute" }} />;

  if (
    (Boolean(user?.email) && protect) ||
    (Boolean(!user?.email) && !protect)
  ) {
    return <>{children}</>;
  }

  return (
    <Router.Navigate
      to={`${Constants.API_CONFIG.base}${
        Boolean(user?.email) ? "dashboard" : "account/login"
      }`}
    />
  );
};

export declare namespace route {
  export type Type = children & { protect?: boolean };
}
