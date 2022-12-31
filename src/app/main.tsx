import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Providers from "src/app/providers";
import * as Routes from "src/app/routes";
import * as Themes from "src/theme";

export const Main = () => (
  <Router.BrowserRouter>
    <Themes.Main>
      <Providers.Main>
        <React.Suspense fallback={<Components.Global.GlobalLoader />}>
          <Routes.Main />
        </React.Suspense>
      </Providers.Main>
    </Themes.Main>
  </Router.BrowserRouter>
);
