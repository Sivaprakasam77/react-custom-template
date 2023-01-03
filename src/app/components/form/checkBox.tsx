import * as Formik from "formik";
import * as Mui from "@mui/material";
import React from "react";

export function CheckBox(props: checkBox.Type) {
  return <Formik.Field component={MuiCheckBox} {...props} />;
}

export function MuiCheckBox({
  label,
  form: { touched, errors, values, ...form },
  field,
  sx,
  disabled,
}: Formik.FieldProps & Mui.TextFieldProps) {
  const error = Boolean(errors[field.name] && touched[field.name]);
  return (
    <Mui.Stack spacing={1} sx={sx}>
      <Mui.FormControlLabel
        control={
          <Mui.Checkbox {...field} {...form} checked={values[field.name]} />
        }
        label={label as string}
        disabled={disabled}
      />
      <Mui.FormHelperText
        error={error}
        sx={{ display: error ? "flex" : "none" }}
      >
        <>{error && errors[field.name]}</>
      </Mui.FormHelperText>
    </Mui.Stack>
  );
}

export declare namespace checkBox {
  export type Type = Partial<Mui.CheckboxProps> & { label: React.ReactNode };
}
