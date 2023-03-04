import { Alert, Box, BoxProps, CircularProgress } from "@mui/material";
import { FC } from "react";

interface ErrorMessageProps extends BoxProps {
  message?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  const { paddingY, message = "An error has occurred", ...rest } = props;

  return (
    <Box
      textAlign="center"
      width="100%"
      paddingY={paddingY ?? "3rem"}
      {...rest}
    >
      <Alert severity="error">{message}</Alert>
    </Box>
  );
};
