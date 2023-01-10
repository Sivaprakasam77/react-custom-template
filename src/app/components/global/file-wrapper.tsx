import * as Mui from "@mui/material";

export const FileWrapper = ({
  children,
  ...props
}: Pick<Mui.TextFieldProps, "name" | "onChange" | "disabled" | "sx"> &
  children) => (
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
