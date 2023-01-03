import * as Formik from "formik";
import * as Mui from "@mui/material";
import React from "react";
import * as Components from "src/app/components";

export const RadioButton = (props: radioButton.Type) => (
  <Formik.Field component={MuiRadioButton} {...props} />
);

export const MuiRadioButton = ({
  label,
  form: { touched, errors, values, setFieldValue, ...form },
  field,
  radioValues,
  size,
}: Formik.FieldProps & Mui.TextFieldProps & { radioValues: string[] }) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  const handleValue = (value: string) => setFieldValue(field.name, value);

  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <Mui.Stack
        direction="row"
        spacing={2}
        sx={{ textTransform: "capitalize" }}
      >
        {radioValues.map((value) => (
          <Mui.FormControlLabel
            key={value}
            control={
              <Mui.Radio
                {...field}
                {...form}
                size={size}
                onChange={() => handleValue(value)}
                checked={value === values[field.name]}
              />
            }
            label={value}
            onClick={() => handleValue(value)}
          />
        ))}
      </Mui.Stack>
      <Mui.FormHelperText
        error={error}
        sx={{ display: error ? "flex" : "none" }}
      >
        <>{error && errors[field.name]}</>
      </Mui.FormHelperText>
    </Components.Form.FieldLabel>
  );
};

export declare namespace radioButton {
  export type Type = Partial<Mui.RadioProps> & {
    label: React.ReactNode;
    radioValues: string[];
  };
}
