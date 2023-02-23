import { Container, Typography } from "@mui/material";
import TopNavBar from "./components/TopNavBar";
import { WelcomePage } from "./pages/WelcomePage";

function App() {
  return (
    <>
      <TopNavBar />
      <Container maxWidth="md">
        <Typography variant="h2" textAlign="center">
          Reptile Tracker
        </Typography>
        <WelcomePage />
      </Container>
    </>
  );
}

export default App;
