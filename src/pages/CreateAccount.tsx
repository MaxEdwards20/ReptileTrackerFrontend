import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateAccount: FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();

  const handleSubmit = () => {
    setError(undefined);
    if (!(email && password && firstName && lastName)) {
      setError("Please enter all fields");
      return;
    }
    if (email.indexOf("@") === -1) {
      setError("Please enter a valid email");
      return;
    }

    // This can be moved to an API file when Ditton pushes his code up. I am getting CORS error trying to use this
    const createAccount = async () => {
      const res = await fetch("http://localhost:3000/user", {
        method: "POST",
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      const data = await res.json();
      return data;
    };
    let res = createAccount();
    console.log(res);
    return navigate("/profile");
  };

  const switchToLogin = () => navigate("/sign-in");

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Stack gap="2rem" paddingX="1rem">
            <Stack direction="row">
              <IconButton>
                <ArrowBackIcon onClick={switchToLogin} />
              </IconButton>
              <Typography
                variant="h4"
                textAlign="center"
                width="100%"
                sx={{ mr: "2rem" }}
              >
                Create Your Account
              </Typography>
            </Stack>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Alert severity="error">{error}</Alert>}

            <Button
              variant="contained"
              size="large"
              sx={{ width: "12rem", alignSelf: "center", my: "1rem" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>

            <Stack direction="row" gap="1rem" justifyContent="center">
              <Divider orientation="vertical" flexItem />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateAccount;
