import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavigationTabs } from "./NavigationTabs";
import { UserIcon } from "./UserIcon";

type TopNavBarProps = {
  authenticated?: boolean;
};

export type TabPaths =
  | "home"
  | "dashboard"
  | "schedules"
  | "profile"
  | "reptiles";

const authTabInfo: Partial<Record<TabPaths, string>> = {
  home: "Home",
  dashboard: "Dashboard",
  profile: "Profile",
  schedules: "Schedules",
  reptiles: "Reptiles",
};

const unAuthTabInfo: Partial<Record<TabPaths, string>> = {
  home: "Home",
};

export const HeaderNav: FC<{ auth?: boolean }> = ({ auth = false }) => {
  return (
    <>
      <Stack
        justifyContent="end"
        width="100%"
        direction="row"
        alignItems="center"
        gap="2rem"
      >
        <NavigationTabs tabInfo={auth ? authTabInfo : unAuthTabInfo} />
        <UserIcon auth={auth} />
      </Stack>
      <Typography variant="h2" textAlign="center" paddingBottom="6rem">
        Reptile Tracker
      </Typography>

      <Outlet />
    </>
  );
};

export default HeaderNav;
