import { List, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

export const WelcomePage = () => {
  return (
    <Stack paddingY="2rem">
      <Typography>Welcome to Reptile Tracker!</Typography>
      <Typography>
        Reptile Tracker helps you keep track of your reptiles
      </Typography>
    </Stack>
  );
};

export default WelcomePage;
