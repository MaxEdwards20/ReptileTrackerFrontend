import { Container, Typography } from "@mui/material";
import React, { FC } from "react";

export const HomePage: FC = () => {
  return (
    <Container maxWidth="md">
      <Typography>Welcome to Reptile Tracker!</Typography>
      <Typography>
        Reptile Tracker helps you keep track of your reptiles so that you can
        focus on feeding thema nd getting new ones.
      </Typography>
    </Container>
  );
};

export default HomePage;
