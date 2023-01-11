import * as Formik from "formik";
import * as FormikMuiPickers from "formik-material-ui-pickers";
import * as Mui from "@mui/material";
import * as MuiDate from "@mui/x-date-pickers";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

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
  shouldDisableDate,
  ...props
}: FormikMuiPickers.DatePickerProps) => {
  const { nestedParser } = Hooks.Utils.useUtils();
  const {
    form: { errors, touched },
    field: { name },
  } = props;
  const error = Boolean(
    nestedParser(name, errors) && nestedParser(name, touched)
  );
  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <MuiDate.DatePicker
        {...(FormikMuiPickers.fieldToDatePicker(props) as any)}
        shouldDisableDate={
          shouldDisableDate
            ? (dateParam: string) => {
                return new Date().toLocaleDateString(dateParam) ===
                  new Date().toLocaleDateString()
                  ? true
                  : false;
              }
            : undefined
        }
        renderInput={(props) => (
          <Mui.TextField
            size={size}
            {...props}
            fullWidth
            error={error}
            helperText={<>{error && nestedParser(name, errors)}</>}
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
  const { nestedParser } = Hooks.Utils.useUtils();
  const {
    form: { errors, touched },
    field: { name },
  } = props;
  const error = Boolean(
    nestedParser(name, errors) && nestedParser(name, touched)
  );
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
            helperText={<>{error && nestedParser(name, errors)}</>}
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
