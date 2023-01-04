import React from "react";
import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const ImageField = React.memo(
  ({
    name,
    height,
    width,
    sx,
    label,
    disabled,
    initialName,
    enableAvatar = false,
    enableCropper = false,
    enableMultiple = false,
  }: imageCropper.Props & Mui.CardMediaProps) => {
    const maxImageLength = 4;
    const { toBase64 } = Hooks.Utils.useUtils();
    const [imageSrc, setImageSrc] = React.useState<any>(null);
    const [view, setView] = React.useState(false);
    const { setFieldValue, values, errors, touched, isSubmitting } =
      Formik.useFormikContext<{ [key: string]: string[] }>();
    const error = Boolean(errors[name] && touched[name]);

    let widthAlign = React.useMemo(
      () =>
        ({ 1: 1, 2: 1, 3: 2, 4: 2 }?.[
          values[name]?.length > 4 ? 4 : values[name]?.length
        ]),
      [values[name]?.length]
    );
    let heightAlign = React.useMemo(
      () =>
        ({ 1: 1, 2: 2, 3: 2, 4: 2 }?.[
          values[name]?.length > 4 ? 4 : values[name]?.length
        ]),
      [values[name]?.length]
    );

    const handleOnChange = React.useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (enableCropper && !enableMultiple)
          setImageSrc(URL.createObjectURL(e.target?.files?.[0] as File));
        else
          setFieldValue(
            name,
            await Promise.all(
              [...(e.target as unknown as { files: Blob[] })?.files]?.map(
                (file) => toBase64(file)
              )
            )
          );
      },
      [name]
    );

    const handleOnDrop = React.useCallback(
      async (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (enableCropper && !enableMultiple)
          setImageSrc(URL.createObjectURL(event.dataTransfer?.files?.[0]));
        else
          setFieldValue(
            name,
            await Promise.all(
              [
                ...(event.dataTransfer as unknown as { files: Blob[] })?.files,
              ]?.map((file) => toBase64(file))
            )
          );
      },
      [name]
    );

    const handleNoop = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
      },
      [name]
    );

    const handleView = React.useCallback(() => setView(!view), [name]);

    const onSave = React.useCallback(
      (img: string) => {
        setFieldValue(name, img);
        setImageSrc("");
      },
      [name]
    );

    const onCancel = React.useCallback(() => setImageSrc(""), [name]);

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
            {enableAvatar && !enableMultiple ? (
              <Mui.Avatar
                src={
                  values[name]?.[0] ||
                  `https://avatars.dicebear.com/api/initials/${initialName}.svg`
                }
                sx={{
                  cursor: "pointer",
                  textAlign: "center",
                  objectFit: "cover",
                  boxShadow: values[name] && "0px 0px 10px #00000050",
                  border: (theme) =>
                    error
                      ? `1px solid ${theme.palette.error.main}`
                      : values[name]?.[0]
                      ? undefined
                      : `1px solid ${theme.palette.grey[400]}`,
                  ...sx,
                }}
              />
            ) : (
              values[name]?.slice(0, maxImageLength).map((src, index) => (
                <Mui.Box
                  sx={{ position: "relative", float: "left" }}
                  key={index}
                >
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
                  {values[name].length > maxImageLength &&
                    index === maxImageLength - 1 && (
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
                          values[name].length - maxImageLength
                        } more`}</Mui.Typography>
                      </Mui.Stack>
                    )}
                </Mui.Box>
              ))
            )}
          </label>
          {error && (
            <Mui.Typography color="error" variant="caption">
              {errors[name]}
            </Mui.Typography>
          )}
          <Mui.Box
            sx={{
              display: disabled && !enableAvatar ? "block" : "none",
              boxShadow: `0 0 100px rgba(0, 0, 0, 0.26) inset`,
              zIndex: 1,
              position: "absolute",
              height: "100%",
              width: "100%",
              top: 0,
              borderRadius: 1,
            }}
          />
          {view && values[name]?.length && (
            <Components.Global.FullView
              onClick={handleView}
              sources={values[name]}
            />
          )}
        </Mui.Box>
        <Components.Global.ImageCropper
          imageSrc={imageSrc}
          save={onSave}
          cancel={onCancel}
          width={
            enableAvatar ? 200 : document.getElementById(name)?.clientWidth
          }
          height={
            enableAvatar ? 200 : document.getElementById(name)?.clientHeight
          }
        />
      </Components.Form.FieldLabel>
    );
  }
);

export declare namespace imageCropper {
  export interface Props {
    name: string;
    height: string | number;
    width: string | number;
    label?: string;
    enableCropper?: boolean;
    enableMultiple?: boolean;
    disabled?: boolean;
    enableAvatar?: boolean;
    initialName?: string;
  }
}
