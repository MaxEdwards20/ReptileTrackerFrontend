import { Divider, Stack, StackProps, Typography } from "@mui/material";
import { FC } from "react";

interface HeaderTitleProps extends StackProps {
  title: string;
  secondary?: boolean;
}

export const HeaderTitle: FC<HeaderTitleProps> = (props) => {
  const { title, children, secondary = false } = props;
  return (
    <>
      <Stack
        direction="row"
        paddingTop="2rem"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant={secondary ? "h4" : "h3"}>{title}</Typography>
        {children}
      </Stack>
      {!secondary && <Divider sx={{ my: "2rem" }} />}
    </>
  );
};
