import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";

export const FullView = ({
  onClick,
  ...props
}: Pick<Mui.AvatarProps, "src"> & Pick<Mui.IconButtonProps, "onClick">) => (
  <Mui.Card
    elevation={5}
    sx={{
      borderRadius: 2,
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: "100vw",
      height: "100vh",
      zIndex: (theme) => theme.zIndex.appBar + 1,
      objectFit: "contain",
    }}
  >
    <Mui.Stack
      alignItems="center"
      component={Mui.CardContent}
      sx={{ position: "relative", background: `#00000090`, px: 0 }}
    >
      <Mui.IconButton
        disableRipple
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          bgcolor: "background.default",
        }}
        onClick={onClick}
      >
        <MuiIcons.Close />
      </Mui.IconButton>
      <Mui.CardMedia
        component="img"
        sx={{
          borderRadius: 2,
          width: "99vw",
          height: "95vh",
          objectFit: "contain",
        }}
        {...props}
      />
    </Mui.Stack>
  </Mui.Card>
);
