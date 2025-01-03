import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import WebboardIcon from "../component/CustomIcons";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from '@mui/icons-material/Error';
import AppTheme from '../theme/AppTheme';

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function CreateTopicPage(props) {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API}/authen`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
        } else {
          localStorage.removeItem("token");
          window.location = "/login";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [category, setCategory] = useState("");
  const [alert, setAlert] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("id");
    const data = new FormData(event.currentTarget);
    const jsonData = {
      topic_name: data.get("topic"),
      description: data.get("description"),
      category: data.get("category"),
      user_id: user_id,
    };

    fetch("http://localhost:8080/createtopic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tell the server we're sending JSON
      },
      body: JSON.stringify(jsonData), // Convert JavaScript object to JSON string
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setAlert("success");
          setTimeout(() => {
            redirectPage();
          }, 2000);
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
          top: "16px",       // Adjusts position from the top
          left: "50%",       // Centers horizontally
          transform: "translateX(-50%)", // Centers the alert
          zIndex: 9999,      // Ensures it stays above other elements
          boxShadow: 0,
          backgroundImage: "none",
        }}
      >
        Topic is successfully created.
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
          Fail to create a topic
        </Alert>
      )}
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <WebboardIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Create a post
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="topic">Topic</FormLabel>
              <TextField
                autoComplete="topic"
                name="topic"
                required
                fullWidth
                id="topic"
                placeholder="Insert Topic..."
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                autoComplete="description"
                name="description"
                required
                id="description"
                placeholder="Insert Description..."
                multiline
                rows={4}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                name="category"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={"technology"}>Technology</MenuItem>
                <MenuItem value={"entertainment"}>Entertainment</MenuItem>
                <MenuItem value={"health"}>Health</MenuItem>
                <MenuItem value={"education"}>Education</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={redirectPage}
            >
              back
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
