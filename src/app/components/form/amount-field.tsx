import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as NumberFormat from "react-number-format";
import React from "react";
import * as Components from "src/app/components";

export const AmountField = (props: Mui.TextFieldProps) => (
  <Formik.Field component={MuiAmountField} {...props} />
);

export const MuiAmountField = ({
  label,
  form: { handleChange, handleBlur, isSubmitting, touched, errors, values },
  field,
  InputProps,
  onChange,
  disabled,
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
        disabled={isSubmitting || disabled}
        {...field}
        {...props}
        id={field.name}
        onChange={onChange || handleChange}
        onBlur={handleBlur}
        value={values[field.name]}
        inputProps={{
          style: { textAlign: "right" },
        }}
        InputProps={{
          inputComponent:
            AmountFormatCustom as unknown as React.ElementType<Mui.InputBaseComponentProps>,
          ...InputProps,
        }}
      />
    </Components.Form.FieldLabel>
  );
};

export const AmountFormatCustom = React.forwardRef<
  NumberFormat.NumericFormatProps,
  CustomProps
>(({ onChange, ...other }, ref) => (
  <NumberFormat.NumericFormat
    {...other}
    getInputRef={ref}
    onValueChange={(values) => {
      onChange({
        target: {
          name: other.name,
          value: values.value,
        },
      });
    }}
    thousandSeparator
    thousandsGroupStyle="lakh"
    allowNegative={false}
    // isNumericString
  />
));

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
