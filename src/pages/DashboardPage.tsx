import { Container } from "@mui/material";
import { FC } from "react";
import { CreateReptile } from "../components/CreateReptile";
import { HeaderTitle } from "../components/HeaderTitle";
import ReptileList from "../components/ReptileList";
import { Reptile } from "../api/models";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import { ScehduleList } from "../components/ScheduleList";
export const DashboardPage: FC = () => {
  const [reptiles, setReptiles] = useState<Reptile[]>([]);
  const { api, logout } = useContext(AuthContext);
  return (
    <Container maxWidth="md">
      <Button onClick={logout}>Logout</Button>
      <HeaderTitle title="Dashboard" />
      <ReptileList />
    </Container>
  );
};
