import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { redirect } from "react-router-dom";
import SignIn from "./SignIn";

export const CreateAccount: FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();

  const handleSubmit = () => {
    setError(undefined);
    if (!email || !password) {
      setError("Please enter an email and password");
      return;
    }
    if (email.indexOf("@") === -1) {
      setError("Please enter a valid email");
      return;
    }

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
    return redirect("/home");
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Stack gap="2rem" paddingX="1rem">
            <Typography variant="h4" textAlign="center">
              Create Your Account
            </Typography>
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
