import * as Formik from "formik";
import * as FormikMuiPickers from "formik-material-ui-pickers";
import * as Mui from "@mui/material";
import * as MuiDate from "@mui/x-date-pickers";
import * as Components from "src/app/components";

export const DateTimePicker = ({
  dateOnly,
  ...props
}: dateTimePicker.Props & { dateOnly?: boolean }) => (
  <Formik.Field
    component={dateOnly ? FormikMuiDatePicker : FormikMuiDateTimePicker}
    {...props}
  />
);

export const FormikMuiDatePicker = ({
  label,
  size,
  ...props
}: FormikMuiPickers.DatePickerProps) => {
  const {
    form: { errors, touched },
    field: { name },
  } = props;
  const error = Boolean(errors[name] && touched[name]);
  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <MuiDate.DatePicker
        {...(FormikMuiPickers.fieldToDatePicker(props) as any)}
        shouldDisableDate
        renderInput={(props) => (
          <Mui.TextField
            size={size}
            {...props}
            fullWidth
            error={error}
            helperText={<>{error && errors[name]}</>}
            onKeyDown={(e) => e.preventDefault()}
          />
        )}
        PopperProps={{
          sx: {
            bgcolor: (theme: { palette: { mode: string } }) =>
              theme.palette.mode === "dark" ? "background.default" : undefined,
          },
        }}
      />
    </Components.Form.FieldLabel>
  );
};

export const FormikMuiDateTimePicker = ({
  label,
  size,
  ...props
}: FormikMuiPickers.DateTimePickerProps) => {
  const {
    form: { errors, touched },
    field: { name },
  } = props;
  const error = Boolean(errors[name] && touched[name]);
  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <MuiDate.DateTimePicker
        {...(FormikMuiPickers.fieldToDateTimePicker(props) as any)}
        renderInput={(props) => (
          <Mui.TextField
            size={size}
            {...props}
            fullWidth
            error={error}
            helperText={<>{error && errors[name]}</>}
            onKeyDown={(e) => e.preventDefault()}
          />
        )}
        PopperProps={
          {
            sx: {
              bgcolor: (theme: { palette: { mode: string } }) =>
                theme.palette.mode === "dark"
                  ? "background.default"
                  : undefined,
            },
          } as any
        }
      />
    </Components.Form.FieldLabel>
  );
};

export declare namespace dateTimePicker {
  export type Props = Required<
    Pick<Mui.TextFieldProps, "name" | "label" | "size">
  > &
    Partial<MuiDate.DateTimePickerProps<any, any>>;
}
