import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate, useParams, Link  } from "react-router-dom";
import Footer from "../component/Footer";
import AppAppBar from "../component/AppAppBar";
import AppTheme from "../theme/AppTheme";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

export default function EditTopicPage(props) {
  const { id } = useParams(); //topic id
  const str_id = localStorage.getItem("id");
  const navigate = useNavigate();

  const [topic, setTopic] = useState("sdfdsf");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Initialize with empty string
  const [authorId, setAuthorId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState("");

  const capitalize = (str) => {
    if (!str) return str; // Handle empty string or null
    return str[0].toUpperCase() + str.slice(1);
  };

  const redirectPage = () => {
    navigate("/");
  };

  const fetchTopicId = () => {
    fetch(`http://localhost:8080/getonetopic/?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const data = result.data[0];
        setTopic(data.topic_name);
        setDescription(data.description);
        setCategory(data.category);
        setAuthorId(data.user_id);
        setDate(data.created_time);
        return data.user_id; // Return the authorId to chain the next fetch
      })
      .then((authorId) => {
        // Use the returned authorId to fetch user data
        fetchUserdataById(authorId);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchUserdataById = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/getuser?id=${id}`
      );
      const user = await response.json();
      setAuthorName(user.data.fname);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = (topic_id) => {
    fetch(`${process.env.REACT_APP_API}/deletetopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic_id }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          setAlert("success");
          window.scrollTo({
            top: 0,
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        setAlert("error");
        console.error("Error Delete topic", error);
      });
  };

  useEffect(() => {
    fetchTopicId();
    // eslint-disable-next-line
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        {alert === "success" && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            variant="outlined"
          >
            Topic is already delete
          </Alert>
        )}
        {alert === "error" && (
          <Alert
            icon={<ErrorIcon fontSize="inherit" />}
            severity="error"
            variant="outlined"
          >
            Topic is fail to delete
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 1,
            alignItems: "",
          }}
        >
          <Button
            color="info"
            variant="contained"
            size="small"
            onClick={() => redirectPage()}
          >
            Back
          </Button>
        </Box>
        <Typography variant="h2">{capitalize(topic)}</Typography>
        <Typography variant="p" color="text.secondary">
          {capitalize(category)}
        </Typography>
        <CardMedia
          component="img"
          alt="random picture"
          image={`https://picsum.photos/800/450?random=${1}`}
          sx={{
            aspectRatio: "16 / 9",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        <Typography variant="h5">{capitalize(description)}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="p" color="text.secondary">
            created by {capitalize(authorName)}
          </Typography>
          <Typography variant="p" color="text.secondary">
            {new Date(date).toLocaleString()}
          </Typography>
        </Box>

        {authorId == str_id && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 1,
              alignItems: "",
            }}
          >
            <Button
              color="success"
              variant="contained"
              size="small"
              component={Link}
              to={`/edit/${id}`}
            >
              Edit
            </Button>
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={() => handleDelete(id)}
            >
              DELETE
            </Button>
          </Box>
        )}
      </Container>
      <Footer />
    </AppTheme>
  );
}
