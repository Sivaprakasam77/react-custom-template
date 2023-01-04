import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";

export const RichTextEditor = ({
  name,
  label,
  toolbar,
}: RichTextEditorProps &
  Mui.TextFieldProps & { toolbar?: object | undefined }) => {
  const { values, errors, touched, setFieldValue } = Formik.useFormikContext<{
    [key: string]: string;
  }>();
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const error = Boolean(errors[name] && touched[name]);

  const handleChange = React.useCallback(
    (value: EditorState) => {
      setEditorState(value);
      const rteContent = convertToRaw(value.getCurrentContent());
      const stringContent = JSON.stringify(rteContent);
      setFieldValue(name, rteContent?.blocks?.[0]?.text ? stringContent : "");
    },
    [name]
  );
  const handleClear = React.useCallback(() => {
    setEditorState(EditorState.createEmpty());
    setFieldValue(name, "");
  }, [name]);

  React.useEffect(() => {
    if (values[name] === "") handleClear();
  }, [values[name]]);

  return (
    <Mui.Stack spacing={1}>
      <Mui.Typography
        component={Mui.FormLabel}
        color={error ? "error" : undefined}
      >
        {label}
      </Mui.Typography>
      <Mui.Box
        sx={{
          borderRadius: 1,
          border: (theme) =>
            error
              ? `1px solid ${theme.palette.error.main}`
              : `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        <Mui.TextField
          name={name}
          value={values[name]}
          sx={{ display: "none" }}
        />
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleChange}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              // "embedded",
              "emoji",
              "image",
              "remove",
              "history",
            ],
            fontFamily: {
              options: [
                "San Serif",
                "Arial",
                "Georgia",
                "Impact",
                "Tahoma",
                "Times New Roman",
                "Verdana",
              ],
            },
          }}
          toolbarStyle={{
            boxShadow: "0px 1px 5px -5px black",
          }}
          toolbarCustomButtons={[
            <div
              className="rdw-option-wrapper"
              aria-selected="false"
              title="Clear"
              onClick={handleClear}
            >
              <MuiIcons.Clear fontSize="inherit" />
            </div>,
          ]}
        />
      </Mui.Box>
      <Mui.FormHelperText error={error}>
        <>{error && errors[name]}</>
      </Mui.FormHelperText>
    </Mui.Stack>
  );
};

interface RichTextEditorProps {
  name: string;
  label?: string;
}
