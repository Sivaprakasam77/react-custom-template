import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as Components from "src/app/components";

export const AutoCompleteField = (
  props: Mui.AutocompleteProps<any, boolean, boolean, boolean> & {
    FontColor?: boolean;
    label: any;
    name: any;
  }
) => <Formik.Field component={MuiAutoComplete} {...props} />;

export const MuiAutoComplete = ({
  label,
  form: { setFieldValue, isSubmitting, touched, errors, values },
  field,
  onChange,
  ...props
}: Formik.FieldProps &
  Mui.AutocompleteProps<any, boolean, boolean, boolean> & {
    label: any;
  }) => {
  const error = Boolean(errors[field.name] && touched[field.name]);

  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <Mui.Autocomplete
        size="small"
        fullWidth
        disabled={isSubmitting}
        {...field}
        {...props}
        onChange={(_, newValue) => {
          setFieldValue(field.name, newValue);
        }}
        value={values[field.name] ? values[field.name] : []}
        // inputValue={values[field.name]}
        PaperComponent={(props) => (
          <Mui.Paper
            elevation={1}
            {...props}
            sx={{ bgcolor: "background.default" }}
          />
        )}
        sx={{
          "& fieldset": {
            borderColor: error ? "error.main" : undefined,
          },
        }}
      />
      {error && (
        <Mui.FormHelperText error={error}>
          {JSON.stringify(errors[field.name]).replaceAll(
            /(\".*\"\:|[\{\}\,\"\:])/g,
            ""
          )}
        </Mui.FormHelperText>
      )}
    </Components.Form.FieldLabel>
  );
};
