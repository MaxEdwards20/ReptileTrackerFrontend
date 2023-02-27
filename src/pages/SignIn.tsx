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
import { Navigate, Link } from "react-router-dom";

export const SignIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();

  const handleSignIn = () => {
    setError(undefined);
    if (!email || !password) {
      setError("Please enter an email and password");
      return;
    }
    if (email.indexOf("@") === -1) {
      setError("Please enter a valid email");
      return;
    }
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Stack gap="2rem" paddingX="1rem">
            <Typography variant="h4" textAlign="center">
              Sign In
            </Typography>
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
              onClick={handleSignIn}
            >
              Sign In
            </Button>

            <Stack direction="row" gap="1rem" justifyContent="center">
              <Button variant="text" size="small" onClick={() => {}}>
                Forgot Password
              </Button>
              <Divider orientation="vertical" flexItem />
              <Link to="/create-account" replace={true}>
                <Button variant="text" size="small">
                  Create Account
                </Button>
              </Link>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignIn;
