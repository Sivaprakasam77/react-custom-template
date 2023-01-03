import * as Mui from "@mui/material";

export function GlobalLoader({ sx, ...props }: Mui.StackProps) {
  return (
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
        "& .wave": {
          bgcolor: (theme) =>
            `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        },
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
}
