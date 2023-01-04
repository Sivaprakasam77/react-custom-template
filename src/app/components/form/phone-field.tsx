import * as Formik from "formik";
import * as NumberFormat from "react-number-format";
import * as Mui from "@mui/material";
import React from "react";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";

export const PhoneField = ({
  label,
  disabled,
  ...props
}: Mui.TextFieldProps) => {
  const user = React.useContext(Contexts.UserContext);
  const { values, errors, touched, setFieldValue, isSubmitting } =
    Formik.useFormikContext<{ [key: string]: string }>();
  const [countryCode, setCountryCode] = React.useState<string>(
    Constants.COUNTRY_FLAG_CODE.find(({ dial_code }) =>
      values[props.name as string]?.includes(dial_code)
    )?.dial_code || "+91"
  );
  const name = props.name as string;
  const error = Boolean(errors[name] && touched[name]);

  React.useEffect(() => {
    if (
      !Boolean(
        Constants.COUNTRY_FLAG_CODE.find(({ dial_code }) =>
          values[props.name as string]?.includes(dial_code)
        )?.dial_code
      )
    ) {
      setCountryCode(
        Constants.COUNTRY_FLAG_CODE.find(
          ({ code }) => code === user?.detected_country
        )?.dial_code || "+91"
      );
    }
  }, []);

  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <Mui.Stack direction="row" spacing={1} alignItems="flex-end">
        <Mui.Autocomplete
          size="small"
          disableClearable
          disabled={isSubmitting || disabled}
          onChange={(_, newValue) => {
            setCountryCode((prev) => {
              setFieldValue(
                props.name as string,
                `${newValue?.dial_code}${values[props.name as string]?.replace(
                  prev,
                  ""
                )}`
              );
              return newValue?.dial_code as string;
            });
          }}
          value={Constants.COUNTRY_FLAG_CODE.find(
            ({ dial_code }) => dial_code === countryCode
          )}
          autoHighlight
          options={Constants.COUNTRY_FLAG_CODE}
          getOptionLabel={(option) => `${option.flag} ${option.dial_code}`}
          renderOption={(props, option) => (
            <Mui.Typography component="li" data-value={option} {...props}>
              {option.flag} {option.dial_code}
            </Mui.Typography>
          )}
          renderInput={(params) => (
            <Mui.TextField
              {...params}
              sx={{ width: 100 + (countryCode.length || 1) * 4.5 }}
            />
          )}
          PaperComponent={(props) => (
            <Mui.Paper
              elevation={1}
              {...props}
              sx={{ bgcolor: "background.default" }}
            />
          )}
        />
        <Mui.TextField
          fullWidth
          placeholder="09876 54321"
          {...props}
          id={name}
          disabled={disabled || isSubmitting}
          error={error}
          InputProps={{
            inputComponent:
              PhoneNumberFormat as unknown as React.ElementType<Mui.InputBaseComponentProps>,
          }}
          value={values[props.name as string]?.replace(countryCode, "")}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue(
              props.name as string,
              (countryCode + event.target.value) as string
            )
          }
        />
      </Mui.Stack>
      <Mui.FormHelperText error={error}>
        <>{error && errors[name]}</>
      </Mui.FormHelperText>
    </Components.Form.FieldLabel>
  );
};

export const PhoneNumberFormat = React.forwardRef<
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
    // format="##########"
  />
));

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
