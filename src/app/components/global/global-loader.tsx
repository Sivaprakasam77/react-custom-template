import * as Mui from "@mui/material";

export const GlobalLoader = ({ sx, ...props }: Mui.StackProps) => (
  <Mui.Stack
    alignItems="center"
    justifyContent="center"
    {...props}
    sx={{
      position: "fixed",
      background: (theme) => theme.palette.background.default,
      height: "100vh",
      width: "100vw",
      top: 0,
      left: 0,
      p: 5,
      zIndex: (theme) => theme.zIndex.appBar + 1,
      ...sx,
    }}
  >
    <div className="center">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </div>
  </Mui.Stack>
);
