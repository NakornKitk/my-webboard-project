import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import WebboardIcon from '../component/CustomIcons';
import AppTheme from '../theme/AppTheme';
import Alert from "@mui/material/Alert";
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function UserRegisterPage(props) {
  const token = localStorage.getItem("token");
  const [alert, setAlert] = useState("");
 

  const handleSubmit = (event) => {
   event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      fname: data.get('fname'),
      lname: data.get('lname'),
      email: data.get('email'),
      password: data.get('password'),
    };

    fetch(`${process.env.REACT_APP_API}/register`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', // Tell the server we're sending JSON
      },
      body: JSON.stringify(jsonData), // Convert JavaScript object to JSON string
  })
      .then((response) => response.json())
      .then((data) => {
          if (data.status === 'ok') {
              if (token) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
              }
          setAlert("success");
          setTimeout(() => {
            window.location = "/login";
          }, 2000);}
      })
      .catch((error) => {
          setAlert("error");
          console.error('Error:', error);
      });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      { alert === "success" && (
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
          Register successfully.
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
          Fail to Register
        </Alert>
      )}
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <WebboardIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="fname">First Name</FormLabel>
              <TextField
                autoComplete="fname"
                name="fname"
                required
                fullWidth
                id="fname"
                placeholder="Jon"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lname">Last name</FormLabel>
              <TextField
                autoComplete="lname"
                name="lname"
                required
                fullWidth
                id="lname"
                placeholder="Snow"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/login"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}