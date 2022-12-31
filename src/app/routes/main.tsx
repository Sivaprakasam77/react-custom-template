import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";

export const Main = () => {
  const user = React.useContext(Contexts.UserContext);
  return ["US", "CA", "SG"].includes(user?.detected_country || "")
    ? Router.useRoutes([
        {
          path: "*",
          element: <Components.Templates.AccessBlocked />,
        },
      ])
    : Router.useRoutes([
        {
          path: "*",
          element: <Components.Templates.UnderDevelopment />,
        },
      ]);
};
