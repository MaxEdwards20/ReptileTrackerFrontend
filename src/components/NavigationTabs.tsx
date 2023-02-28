import { Tab, Tabs } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function findIndex(path: string) {
  const index = Object.keys(tabPathInfo).indexOf(path);
  if (index === -1) return 0;
  return index;
}

type TabPaths = "/" | "/dashboard" | "/schedules" | "/profile" | "/reptiles";

const tabPathInfo: Record<TabPaths, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/profile": "Profile",
  "/schedules": "Schedules",
  "/reptiles": "Reptiles",
};

export const NavigationTabs: FC = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(findIndex(location.pathname));
  const navigation = useNavigate();

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    const paths = Object.keys(tabPathInfo) as TabPaths[];
    navigation(paths[newValue]);
  };

  useEffect(() => {
    setSelectedTab(findIndex(location.pathname));
  }, [location.pathname]);

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleChange} scrollButtons="auto">
        {Object.keys(tabPathInfo).map((path) => (
          <Tab key={path} label={tabPathInfo[path as TabPaths]} />
        ))}
      </Tabs>
    </div>
  );
};
