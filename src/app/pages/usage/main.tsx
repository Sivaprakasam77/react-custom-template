import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";

export const Main = () => (
  <Mui.Typography
    variant="h6"
    fontWeight={900}
    component={Mui.Stack}
    direction="row"
    alignItems="center"
    justifyContent="center"
    sx={{ height: "80vh" }}
  >
    <MuiIcons.Code sx={{ fontSize: 40, mr: 2 }} />
    React Custom Template
  </Mui.Typography>
);
