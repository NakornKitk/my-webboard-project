import {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import WebboardIcon from "../component/CustomIcons";
import AppTheme from "../theme/AppTheme";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from '@mui/icons-material/Error';

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function UserLoginPage(props) {
  const [alert, setAlert] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior.

    // Extract form data
    const data = new FormData(event.currentTarget);
    const jsonData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // Send JSON data to the server
    fetch(`${process.env.REACT_APP_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tell the server we're sending JSON
      },
      body: JSON.stringify(jsonData), // Convert JavaScript object to JSON string
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id);
          setAlert("success");
          setTimeout(() => {
            window.location = "/";
          }, 2000);
        } else {
          setAlert("error");
        }
      })
      .catch((error) => {
        setAlert("error");
        console.error("Error:", error);
      });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      {alert === "success" && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          variant="outlined"
          sx={{
            position: "fixed", // Ensures it doesn't affect layout
            top: "16px", // Adjusts position from the top
            left: "50%", // Centers horizontally
            transform: "translateX(-50%)", // Centers the alert
            zIndex: 9999, // Ensures it stays above other elements
            boxShadow: 0,
            backgroundImage: "none",
          }}
        >
          Login successfully
        </Alert>
      )}
      { alert === "error" && (
        <Alert
          icon={<ErrorIcon fontSize="inherit" />}
          severity="error"
          variant="outlined"
          sx={{
            position: "fixed", // Ensures it doesn't affect layout
            top: "16px", // Adjusts position from the top
            left: "50%", // Centers horizontally
            transform: "translateX(-50%)", // Centers the alert
            zIndex: 9999, // Ensures it stays above other elements
            boxShadow: 0,
            backgroundImage: "none",
          }}
        >
          Fail to Login
        </Alert>
      )}
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <WebboardIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
            onSubmit={handleSubmit}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              <Link href="/" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in as a Guest
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
