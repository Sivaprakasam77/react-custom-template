import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Themes from "src/theme";

// Available Themes
const themes = ["light", "dark"];

// Context for theme change
export const ThemeContext = React.createContext<{
  mode: string;
  changeMode: () => void;
}>({
  mode: localStorage.getItem("theme") || "light",
  changeMode: () => {},
});

// Main Theme Provider
export const Main = ({ children }: children) => {
  const { pathname } = Router.useLocation();
  const [mode, setMode] = React.useState<string>(
    localStorage.getItem("theme") || "light"
  );

  const changeMode = () => {
    setMode((prev) => {
      let themeMode = themes[themes.indexOf(prev) + 1] || themes[0];
      localStorage.setItem("theme", themeMode);
      return themeMode;
    });
  };

  let theme = React.useMemo(
    () =>
      Mui.createTheme({
        ...Themes.Global.Components(),
        ...(pathname === Constants.API_CONFIG.base
          ? Themes.Global.PaletteLight()
          : {
              light: Themes.Global.PaletteLight(),
              dark: Themes.Global.PaletteDark(),
            }[mode]),
        ...Themes.Global.Typography(),
      }),
    [mode, pathname]
  );

  return (
    <ThemeContext.Provider value={{ mode, changeMode }}>
      <Mui.ThemeProvider theme={theme}>
        <Themes.CssBaseline.Main />
        {children}
      </Mui.ThemeProvider>
    </ThemeContext.Provider>
  );
};
