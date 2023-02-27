import { Container, Typography } from "@mui/material";
import React, { FC } from "react";

export const WelcomePage: FC = () => {
  return (
    <Container maxWidth="md">
      <Typography>Welcome to Reptile Tracker!</Typography>
      <Typography>
        Reptile Tracker helps you keep track of your reptiles
      </Typography>
    </Container>
  );
};

export default WelcomePage;
