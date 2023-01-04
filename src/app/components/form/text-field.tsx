import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Components from "src/app/components";

export const FormField = (props: Mui.TextFieldProps) => (
  <Formik.Field
    component={props.type === "password" ? MuiPasswordField : MuiTextField}
    {...props}
  />
);

export const MuiTextField = ({
  label,
  form: { handleChange, handleBlur, touched, errors, values, isSubmitting },
  field,
  ...props
}: Formik.FieldProps & Mui.TextFieldProps) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <Mui.TextField
        size="small"
        fullWidth
        error={error}
        helperText={<>{error && errors[field.name]}</>}
        disabled={isSubmitting}
        {...field}
        {...props}
        id={field.name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[field.name]}
      />
    </Components.Form.FieldLabel>
  );
};

export const MuiPasswordField = ({
  label,
  type,
  form: { handleChange, handleBlur, isSubmitting, touched, errors, values },
  field,
  ...props
}: Formik.FieldProps & Mui.TextFieldProps) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  const [visible, setVisible] = React.useState(false);
  const handleVisible = React.useCallback(
    () => setVisible(!visible),
    [field.name]
  );
  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <Mui.TextField
        size="small"
        fullWidth
        type={visible ? "text" : type}
        error={error}
        helperText={<>{error && errors[field.name]}</>}
        disabled={isSubmitting}
        InputProps={{
          endAdornment: (
            <Mui.InputAdornment position="end" onClick={handleVisible}>
              <Mui.IconButton size="small">
                {visible ? <MuiIcons.VisibilityOff /> : <MuiIcons.Visibility />}
              </Mui.IconButton>
            </Mui.InputAdornment>
          ),
        }}
        {...field}
        {...props}
        id={field.name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[field.name]}
      />
    </Components.Form.FieldLabel>
  );
};
