import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";

export const UnderDevelopment = () => (
  <Mui.Stack
    alignItems="center"
    justifyContent="center"
    sx={{ height: "100vh", position: "relative", overflow: "hidden" }}
  >
    <Mui.Typography
      variant="h4"
      textAlign="center"
      sx={{ display: "flex", alignItems: "center" }}
    >
      <MuiIcons.Error fontSize="inherit" />
      Page Under Development
    </Mui.Typography>
  </Mui.Stack>
);
