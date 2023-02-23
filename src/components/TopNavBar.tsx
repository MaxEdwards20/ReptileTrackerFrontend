import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, IconButton, Popover, Stack, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

export const TopNavBar = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const navigateToLogin = () => alert("Not implemented");

  return (
    <>
      <Stack
        justifyContent="end"
        width="100%"
        direction="row"
        alignItems="center"
        gap="2rem"
      >
        <div>
          <Tabs value={value} onChange={handleChange} scrollButtons="auto">
            <Tab label="Dashboard" />
            <Tab label="Schedules" />
            <Tab label="Profile" />
          </Tabs>
        </div>
        <IconButton
          sx={{ width: "3rem", height: "3rem", margin: "1rem" }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Stack>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Button sx={{ p: 2 }} variant="text" onClick={navigateToLogin}>
          Sign In
        </Button>
      </Popover>
    </>
  );
};

export default TopNavBar;
