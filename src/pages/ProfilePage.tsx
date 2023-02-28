import { Container } from "@mui/material";
import React, { FC } from "react";
import { useParams } from "react-router-dom";

export const ProfilePage: FC = () => {
  return (
    <Container maxWidth="md">
      <h1>Profile</h1>
    </Container>
  );
};

export default ProfilePage;
