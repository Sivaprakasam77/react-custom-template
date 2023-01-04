import * as Mui from "@mui/material";
import React from "react";

export const FieldLabel = ({
  children,
  label,
  error,
}: children & { label: React.ReactNode; error: boolean }) => (
  <Mui.Stack spacing={1} sx={{ width: "100%" }}>
    <Mui.FormLabel
      error={error}
      sx={{
        color: Mui.colors.grey[600],
      }}
    >
      {label}
    </Mui.FormLabel>
    {children}
  </Mui.Stack>
);
