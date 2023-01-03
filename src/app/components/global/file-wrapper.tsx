import * as Mui from "@mui/material";

export function FileWrapper({
  children,
  ...props
}: Required<Pick<Mui.TextFieldProps, "name" | "onChange" | "disabled">> &
  children) {
  return (
    <>
      <input hidden accept="image/*" id={props.name} type="file" {...props} />
      <label
        htmlFor={props.name}
        style={{
          display: "inline-block",
          width: "fit-content",
          cursor: "pointer",
        }}
      >
        {children}
      </label>
    </>
  );
}
