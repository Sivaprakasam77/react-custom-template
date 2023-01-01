import * as Mui from "@mui/material";
import * as ReactError from "react-error-boundary";

// Error boundary provider
export const ErrorBoundaryProider = (props: children) => (
  <ReactError.ErrorBoundary FallbackComponent={ErrorHandler} {...props} />
);

// Uncaught error handler
const ErrorHandler = ({
  error,
  resetErrorBoundary,
}: ReactError.FallbackProps) => (
  <Mui.Stack
    justifyContent="center"
    alignItems="center"
    component={Mui.Container}
    maxWidth="sm"
    sx={{ height: "100vh" }}
  >
    <Mui.Stack component={Mui.CardContent} alignItems="center" spacing={2}>
      <Mui.Typography variant="h4" color="inherit">
        {error.name}
      </Mui.Typography>
      <Mui.Typography variant="h6" color="inherit">
        {error.message}
      </Mui.Typography>
      <Mui.Button
        onClick={resetErrorBoundary}
        variant="contained"
        sx={{ width: "fit-content" }}
      >
        Try again
      </Mui.Button>
    </Mui.Stack>
  </Mui.Stack>
);
