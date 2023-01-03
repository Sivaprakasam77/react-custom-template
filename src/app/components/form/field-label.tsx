import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";

export function FieldLabel({
  children,
  label,
  error,
}: children & { label: React.ReactNode; error: boolean }) {
  const { pathname } = Router.useLocation();
  return (
    <Mui.Stack spacing={1} sx={{ width: "100%" }}>
      <Mui.FormLabel
        error={error}
        sx={{
          color: pathname.includes("kyc")
            ? "text.primary"
            : Mui.colors.grey[600],
        }}
      >
        {label}
      </Mui.FormLabel>
      {children}
    </Mui.Stack>
  );
}
