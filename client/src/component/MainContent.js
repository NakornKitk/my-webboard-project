import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";



const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}


export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [name, setName] = useState("");
  const [userNames, setUserNames] = useState({});
  const [topic, setTopic] = useState([]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {};
  

  const checkVaildUser = (topicOwnerId) => {
    if (topicOwnerId == id) {
      return true;
    } else {
      return false;
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
          // Redirect to homepage or handle UI update
          window.location = "/";
        }
      })
      .catch((error) => console.error("Error Delete topic", error));
  };

  const fetchUserdata = () => {
    fetch(`${process.env.REACT_APP_API}/getuser?id=${id}`)
      .then((response) => response.json())
      .then((user) => {
        setName(user.data.fname);
      })
      .catch((error) => console.error("Error fetching user data", error));
  };


  const fetchUserdataById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/getuser?id=${id}`);
      const user = await response.json();
      return user.data.fname; // Only return the name
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  const fetchTopicdata = () => {
    fetch(`${process.env.REACT_APP_API}/gettopic`)
      .then((response) => response.json())
      .then((result) => {
        setTopic(result.data);
      })
      .catch((error) => console.error("Error fetching topic data:", error));
  };

  useEffect(() => {
    fetchTopicdata();
    console.log(fetchUserdataById(7))
    if (token) {
      fetchUserdata();
    }
  }, [token]);


  useEffect(() => {
    const fetchUsernames = async () => {
      const names = await Promise.all(
        topic.map(item => fetchUserdataById(item.user_id))
      );
      setUserNames(prevState => ({
        ...prevState,
        ...names.reduce((acc, name, idx) => {
          acc[topic[idx].user_id] = name;
          return acc;
        }, {})
      }));
    };

    if (topic.length > 0) {
      fetchUsernames();
    }
  }, [topic]);



  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        {!token && (
          <Typography variant="h1" gutterBottom>
            Welcome, Guest
          </Typography>
        )}
        {token && (
          <Typography variant="h1" gutterBottom>
            Welcome, {capitalize(name)}
          </Typography>
        )}
        <Typography>
          Stay in the loop with the latest about your topic
        </Typography>
      </div>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          <Chip onClick={handleClick} size="medium" label="All categories" />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Sport"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Entertainment"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Engineering"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Other"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={2} columns={12}>
        {topic.map((item, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 0 ? "Mui-focused" : ""}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={`https://picsum.photos/800/450?random=${index}`}
                sx={{
                  aspectRatio: "16 / 9",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {capitalize(item.category)}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {item.topic_name}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {item.description}
                </StyledTypography>
              </SyledCardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption">{capitalize(userNames[item.user_id])}</Typography>
                </Box>
                <Typography variant="caption">
                  {new Date(item.created_time).toLocaleString()}
                </Typography>
              </Box>

              { checkVaildUser(item.user_id) && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: 'flex-end',
                    gap: 1,
                    alignItems: "center",
                    padding: "16px",
                    paddingTop: 1,
                  }}
                >
                  <Button
                    color="success"
                    variant="contained"
                    size="small"
                    component={Link}
                    to={`/edit/${item.topic_id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(item.topic_id)}
                  >
                    DELETE
                  </Button>
                </Box>
              )}

              
            </SyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
