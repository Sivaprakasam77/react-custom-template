import * as Api from "src/api";
import * as Contexts from "src/app/contexts";
import * as Providers from "src/app/providers";

// initialize app providers
export const Main = ({ children }: children) => (
  <Providers.ErrorBoundaryProider>
    <Providers.customHandlingProvider>
      <Providers.DateAdapter>
        <Api.Server.Main>
          <Contexts.UserProvider>{children}</Contexts.UserProvider>
        </Api.Server.Main>
      </Providers.DateAdapter>
    </Providers.customHandlingProvider>
  </Providers.ErrorBoundaryProider>
);
