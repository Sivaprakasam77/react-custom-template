import * as Mui from "@mui/material";

export const FileWrapper = ({
  children,
  name,
  ...props
}: Pick<
  Mui.TextFieldProps,
  "name" | "onChange" | "onDrop" | "disabled" | "sx"
> &
  children) => {
  const handleNoop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <Mui.Box
      component="div"
      onDrop={props.onDrop}
      onDragOver={handleNoop}
      onDragEnter={handleNoop}
    >
      <input hidden id={name} type="file" {...props} />
      <Mui.CardActionArea
        component="label"
        htmlFor={name}
        sx={{
          display: "inline-block",
          width: "fit-content",
          cursor: "pointer",
          ...props.sx,
        }}
      >
        {children}
      </Mui.CardActionArea>
    </Mui.Box>
  );
};
