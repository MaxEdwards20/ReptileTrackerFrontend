import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavigationTabs } from "./NavigationTabs";
import { UserIcon } from "./UserIcon";

export const HeaderNav: FC = () => {
  return (
    <>
      <Stack
        justifyContent="end"
        width="100%"
        direction="row"
        alignItems="center"
        gap="2rem"
      >
        <NavigationTabs />
        <UserIcon />
      </Stack>
      <Typography variant="h2" textAlign="center" paddingBottom="6rem">
        Reptile Tracker
      </Typography>

      <Outlet />
    </>
  );
};

export default HeaderNav;
