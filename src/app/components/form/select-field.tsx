import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as Components from "src/app/components";

export function SelectField(props: Mui.SelectProps) {
  return <Formik.Field component={MuiSelectField} {...props} />;
}

export function MuiSelectField({
  label,
  form: { handleChange, handleBlur, isSubmitting, touched, errors, values },
  field,
  onChange,
  ...props
}: Formik.FieldProps & Mui.SelectProps) {
  const error = Boolean(errors[field.name] && touched[field.name]);
  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <Mui.Select
        size="small"
        fullWidth
        error={error}
        disabled={isSubmitting}
        {...field}
        {...props}
        id={field.name}
        onBlur={handleBlur}
        onChange={onChange || handleChange}
        value={values[field.name]}
        sx={{
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: Mui.colors.grey[300],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: Mui.colors.grey[300],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: Mui.colors.grey[300],
          },
          ...props.sx,
        }}
      />
      <Mui.FormHelperText error={error}>
        <>{error && errors[field.name]}</>
      </Mui.FormHelperText>
    </Components.Form.FieldLabel>
  );
}
