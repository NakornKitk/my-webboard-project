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
import { SitemarkIcon } from "./component/CustomIcons";
import { useNavigate } from "react-router-dom";

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

export default function SignUp() {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          // alert('authen success')
        } else {
        //   alert("authen failed");
          localStorage.removeItem("token");
          window.location = "/login";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     const jsonData = {
    //       fname: data.get('fname'),
    //       lname: data.get('lname'),
    //       email: data.get('email'),
    //       password: data.get('password'),
    //     };

    //     fetch('http://localhost:8080/register', {
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json', // Tell the server we're sending JSON
    //       },
    //       body: JSON.stringify(jsonData), // Convert JavaScript object to JSON string
    //   })
    //       .then((response) => response.json())
    //       .then((data) => {
    //           if (data.status === 'ok') {
    //               alert('register successful');
    //               if (token) {
    //                 localStorage.removeItem('token')
    //                 localStorage.removeItem('user')
    //               }
    //               window.location = '/login'
    //           } else {
    //               alert('register failed');
    //           }
    //       })
    //       .catch((error) => {
    //           console.error('Error:', error);
    //       });
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
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
              <FormLabel htmlFor="fname">Topic</FormLabel>
              <TextField
                autoComplete="fname"
                name="fname"
                required
                fullWidth
                id="fname"
                placeholder="Insert Topic..."
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lname">Description</FormLabel>
              <TextField
                autoComplete="lname"
                name="lname"
                required
                id="lname"
                placeholder="Insert Description..."
                multiline
                rows={4}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"sport"}>Sport</MenuItem>
                <MenuItem value={"entertainment"}>Entertainment</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={redirectPage}
            >
              back
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
