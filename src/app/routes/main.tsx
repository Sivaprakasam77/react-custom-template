import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Constants from "src/constants";
import * as Layouts from "src/app/layouts";

const UsageRoutes = React.lazy(() => import("src/app/pages/usage/routes"));

export const Main = () => {
  const user = React.useContext(Contexts.UserContext);

  return Constants.API_CONFIG.blockedCountry.includes(
    user?.detected_country || ""
  )
    ? Router.useRoutes([
        {
          path: "*",
          element: <Components.Templates.AccessBlocked />,
        },
      ])
    : Router.useRoutes([
        {
          path: "*",
          element: <Components.Templates.PageNotFound />,
        },
        {
          path: `${Constants.API_CONFIG.base}/*`,
          element: <Layouts.Usage.Main />,
          children: [
            {
              path: "/*",
              element: <UsageRoutes />,
            },
          ],
        },
        {
          path: "usage/*",
          element: <Layouts.Usage.Main />,
          children: [
            {
              path: "*",
              element: <UsageRoutes />,
            },
          ],
        },
        {
          path: "404",
          element: <Components.Templates.PageNotFound />,
        },
        {
          path: "under-development",
          element: <Components.Templates.UnderDevelopment />,
        },
        {
          path: "access-blocked",
          element: <Components.Templates.AccessBlocked />,
        },
        {
          path: "loader",
          element: <Components.Global.GlobalLoader />,
        },
      ]);
};
