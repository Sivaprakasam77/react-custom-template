import * as Mui from "@mui/material";
import * as Router from "react-router-dom";

export const Main = () => (
  <>
    <Mui.AppBar>
      <Mui.Stack component={Mui.Toolbar} direction="row">
        <Mui.Typography variant="h5" fontWeight={1000}>
          React Custom Template
        </Mui.Typography>
      </Mui.Stack>
    </Mui.AppBar>
    <Mui.Container sx={{ mt: 10 }}>
      <Router.Outlet />
    </Mui.Container>
  </>
);
