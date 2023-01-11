import * as Formik from "formik";
import * as Mui from "@mui/material";
import React from "react";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

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
  const { nestedParser } = Hooks.Utils.useUtils();
  const error = Boolean(
    nestedParser(field.name, errors) && nestedParser(field.name, touched)
  );
  const handleValue = React.useCallback(
    (value: string) => setFieldValue(field.name, value),
    [field.name]
  );

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
                checked={value === nestedParser(field.name, values)}
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
        <>{error && nestedParser(field.name, errors)}</>
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
