import * as Mui from "@mui/material";
import * as Themes from "src/theme";
import React from "react";

// Context for theme change
export const ThemeContext = React.createContext<{
  mode: string;
  changeMode: (_mode: string) => void;
}>({
  mode: localStorage.getItem("theme") || "light",
  changeMode: () => {},
});

// Main Theme Provider
export const Main = ({ children }: children) => {
  const [mode, setMode] = React.useState<string>(
    localStorage.getItem("theme") || "light"
  );

  const changeMode = (_mode: string) => setMode(_mode);

  let theme = React.useMemo(
    () =>
      Mui.createTheme({
        ...Themes.Global.Components(),
        ...{
          light: Themes.Global.PaletteLight(),
          dark: Themes.Global.PaletteDark(),
        }[mode],
        ...Themes.Global.Typography(),
      }),
    [mode]
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
