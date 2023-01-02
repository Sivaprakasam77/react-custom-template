import * as React from "react";
import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as Components from "src/app/components";

export const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const ImageSelector = ({
  name,
  label,
  hide,
  multiple,
  height,
  width,
}: image.Props & Mui.CardMediaProps) => {
  const { setFieldValue, values, errors, touched, isSubmitting } =
    Formik.useFormikContext<{ [key: string]: string[] }>();
  const error = Boolean(errors[name] && touched[name]);
  const handleOnChange = async (e: React.FormEvent<HTMLInputElement>) =>
    setFieldValue(
      name,
      await Promise.all(
        [...(e.target as unknown as { files: Blob[] })?.files]?.map((file) =>
          toBase64(file)
        )
      )
    );
  let widthAlign = { 1: 1, 2: 1, 3: 2, 4: 2 }?.[
    values[name]?.length > 4 ? 4 : values[name]?.length
  ];
  let heightAlign = { 1: 1, 2: 2, 3: 2, 4: 2 }?.[
    values[name]?.length > 4 ? 4 : values[name]?.length
  ];
  return (
    <Components.Form.FieldLabel label={hide ? undefined : label} error={error}>
      <Mui.Box sx={{ width: "100%" }}>
        <input
          disabled={isSubmitting}
          hidden
          multiple={multiple}
          accept="image/*"
          id={`browse${name}`}
          type="file"
          name={name}
          onChange={handleOnChange}
        />
        <label
          htmlFor={`browse${name}`}
          style={{
            display: "inline-block",
            height: height,
            width: width,
            overflow: "hidden",
            borderRadius: 5,
          }}
        >
          {!values[name] ? (
            <Mui.Avatar
              sx={{
                cursor: "pointer",
                textAlign: "center",
                borderRadius: 2,
                objectFit: "cover",
                boxShadow: values[name] && "0px 0px 10px #00000050",
                border: (theme) =>
                  Boolean(touched[name] && errors[name])
                    ? `1px solid ${theme.palette.error.main}`
                    : values[name]
                    ? undefined
                    : `1px solid ${theme.palette.grey[400]}`,
                heigth: "100%",
                width: "100%",
                minHeight: "100%",
              }}
            >
              {label}
            </Mui.Avatar>
          ) : (
            values[name]?.slice(0, 4).map((src, index) => (
              <Mui.Box sx={{ position: "relative", float: "left" }} key={index}>
                <Mui.Avatar
                  src={src}
                  sx={{
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: 0,
                    objectFit: "cover",
                    boxShadow: values[name] && "0px 0px 10px #00000050",
                    width: (width as number) / (widthAlign || 1),
                    height: (height as number) / (heightAlign || 1),
                  }}
                />
                {values[name].length > 4 && index === 3 && (
                  <Mui.Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      position: "absolute",
                      top: 0,
                      bgcolor: "#00000090",
                      color: "#fff",
                      width: (width as number) / (widthAlign || 1),
                      height: (height as number) / (heightAlign || 1),
                    }}
                  >
                    <Mui.Typography variant="body1">{`+${
                      values[name].length - 4
                    } more`}</Mui.Typography>
                  </Mui.Stack>
                )}
              </Mui.Box>
            ))
          )}
        </label>
      </Mui.Box>
      {Boolean(touched[name] && errors[name]) && (
        <Mui.Typography color="error" variant="caption">
          {errors[name]}
        </Mui.Typography>
      )}
    </Components.Form.FieldLabel>
  );
};

export const ImageFieldWithCropper = React.memo(
  ({
    name,
    sx,
    label,
    disabled,
    initName,
    avatar,
  }: imageCropper.Props & Mui.CardMediaProps) => {
    const [imageSrc, setImageSrc] = React.useState<any>(null);
    const [view, setView] = React.useState(false);
    const { setFieldValue, values, errors, touched, isSubmitting } =
      Formik.useFormikContext<{ [key: string]: string }>();
    const error = Boolean(errors[name] && touched[name]);

    const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) =>
      setImageSrc(URL.createObjectURL(e.target?.files?.[0] as File));

    const handleOnDrop = async (event: React.DragEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
      setImageSrc(URL.createObjectURL(event.dataTransfer?.files?.[0]));
    };

    const handleNoop = (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
    };

    const handleView = () => setView(!view);

    const onSave = (img: string) => {
      setFieldValue(name, img);
      setImageSrc("");
    };

    const onCancel = () => setImageSrc("");

    return (
      <Components.Form.FieldLabel error={error} label={label}>
        <Mui.Box
          component="div"
          sx={{ width: "100%", position: "relative" }}
          onClick={disabled ? handleView : undefined}
          onDrop={!disabled ? handleOnDrop : undefined}
          onDragOver={!disabled ? handleNoop : undefined}
          onDragEnter={!disabled ? handleNoop : undefined}
        >
          <input
            disabled={disabled || isSubmitting}
            hidden
            accept="image/*"
            id={`browse${name}`}
            type="file"
            name={name}
            onChange={!disabled ? handleOnChange : undefined}
            onClick={(event) => {
              (event.target as unknown as { value: any }).value = null;
            }}
          />
          <label
            htmlFor={`browse${name}`}
            style={{ display: "inline-block", width: "inherit" }}
          >
            {avatar ? (
              <Mui.Avatar
                src={
                  values[name]
                    ? values[name]?.includes("base64")
                      ? values[name]
                      : `${import.meta.env.VITE_API_ENCRYPTION}://${
                          import.meta.env.VITE_API_IP
                        }${import.meta.env.VITE_ASSETS_PATH}${values[name]}`
                    : `https://avatars.dicebear.com/api/initials/${initName}.svg`
                }
                sx={{
                  cursor: "pointer",
                  textAlign: "center",
                  objectFit: "cover",
                  boxShadow: values[name] && "0px 0px 10px #00000050",
                  border: (theme) =>
                    error
                      ? `1px solid ${theme.palette.error.main}`
                      : values[name]
                      ? undefined
                      : `1px solid ${theme.palette.grey[400]}`,
                  ...sx,
                }}
              />
            ) : (
              <Mui.CardMedia
                component="img"
                id={name}
                src={values[name]}
                sx={{
                  borderRadius: 1,
                  p: values[name] ? 0 : 10,
                  objectFit: values[name] ? "cover" : "contain",
                  border: (theme) =>
                    error
                      ? `1px solid ${theme.palette.error.main}`
                      : values[name]
                      ? undefined
                      : `1px solid ${theme.palette.primary.main}`,
                  ...sx,
                }}
              />
            )}
          </label>
          {error && (
            <Mui.Typography color="error" variant="caption">
              {errors[name]}
            </Mui.Typography>
          )}
          <Mui.Box
            sx={{
              display: disabled && !avatar ? "block" : "none",
              boxShadow: `0 0 100px rgba(0, 0, 0, 0.26) inset`,
              zIndex: 1,
              position: "absolute",
              height: "100%",
              width: "100%",
              top: 0,
              borderRadius: 1,
            }}
          />
          {view && (
            <Components.Global.FullView
              onClick={handleView}
              src={
                values[name] ||
                `https://avatars.dicebear.com/api/initials/${initName}.svg`
              }
            />
          )}
        </Mui.Box>
        <Components.Global.ImageCropper
          imageSrc={imageSrc}
          save={onSave}
          cancel={onCancel}
          width={avatar ? 200 : document.getElementById(name)?.clientWidth}
          height={avatar ? 200 : document.getElementById(name)?.clientHeight}
        />
      </Components.Form.FieldLabel>
    );
  }
);

export declare namespace image {
  export interface Props {
    name: string;
    label?: string;
    hide?: boolean;
    multiple?: boolean;
    height: string | number;
    width: string | number;
  }
}

export declare namespace imageCropper {
  export interface Props {
    name: string;
    label?: string;
    disabled?: boolean;
    avatar?: boolean;
    initName?: string;
  }
}
