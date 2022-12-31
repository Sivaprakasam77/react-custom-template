import * as MuiDate from "@mui/x-date-pickers";
import * as AdapterDateFns from "@mui/x-date-pickers/AdapterDateFns";

export const DateAdapter = ({ children }: children) => (
  <MuiDate.LocalizationProvider dateAdapter={AdapterDateFns.AdapterDateFns}>
    {children}
  </MuiDate.LocalizationProvider>
);
