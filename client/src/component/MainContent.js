import { useState, useEffect } from "react";
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
import Loading from "./Loading";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

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

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [name, setName] = useState("");
  const [userNames, setUserNames] = useState({});
  const [topic, setTopic] = useState([]);
  const [search, setSearch] = useState("");
  const [filtercategory, setFilterCategory] = useState("all");
  const [avaliable, setAvaliable] = useState(false);
  const [alert, setAlert] = useState("");

  const capitalize = (str) => {
    if (!str) return str; // Handle empty string or null
    return str[0].toUpperCase() + str.slice(1);
  };

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleCategory = (category) => {
    setFilterCategory(category);
  };

  const handleSearch = (event) => {
    const value = event?.target?.value || ""; // Safely access event.target.value
    setSearch(value);
  };

  const checkVaildUser = (topicOwnerId) => {
    // eslint-disable-next-line
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
          setAlert("success");
          window.scrollTo({
            top: 0,
          });
          fetchTopicdata();
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }
      })
      .catch((error) => {
        setAlert("error");
        console.error("Error Delete topic", error);
      });
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
      const response = await fetch(
        `${process.env.REACT_APP_API}/getuser?id=${id}`
      );
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
        setAvaliable(true);
      })
      .catch((error) => console.error("Error fetching topic data:", error));
  };

  useEffect(() => {
    fetchTopicdata();
    if (token) {
      fetchUserdata();
    }
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const names = await Promise.all(
        topic.map((item) => fetchUserdataById(item.user_id))
      );
      setUserNames((prevState) => ({
        ...prevState,
        ...names.reduce((acc, name, idx) => {
          acc[topic[idx].user_id] = name;
          return acc;
        }, {}),
      }));
    };

    if (topic.length > 0) {
      fetchUsernames();
    }
  }, [topic]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {!avaliable && <Loading></Loading>}
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
        <FormControl
          sx={{ width: { xs: "100%", md: "25ch" } }}
          variant="outlined"
        >
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
            value={search} // Controlled input
            onChange={handleSearch} // onChange handler
          />
        </FormControl>
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
          <Chip
            onClick={() => handleCategory("all")}
            size="medium"
            label="All categories"
            sx={{
              backgroundColor: filtercategory === "all" ? "" : "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={() => handleCategory("technology")}
            size="medium"
            label="Technology"
            sx={{
              backgroundColor:
                filtercategory === "technology" ? "" : "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={() => handleCategory("entertainment")}
            size="medium"
            label="Entertainment"
            sx={{
              backgroundColor:
                filtercategory === "entertainment" ? "" : "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={() => handleCategory("health")}
            size="medium"
            label="Health"
            sx={{
              backgroundColor: filtercategory === "health" ? "" : "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={() => handleCategory("education")}
            size="medium"
            label="Education"
            sx={{
              backgroundColor:
                filtercategory === "education" ? "" : "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={() => handleCategory("other")}
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
          <FormControl
            sx={{ width: { xs: "100%", md: "25ch" } }}
            variant="outlined"
          >
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
              value={search} // Controlled input
              onChange={handleSearch} // onChange handler
            />
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={2} columns={12}>
        {topic
          .filter((item) => {
            if (search === "") return true;
            return item.topic_name.toLowerCase().includes(search.toLowerCase());
          })
          .filter((item) => {
            if (filtercategory === "all") return true;
            return item.category === filtercategory;
          }).length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              top: 0,
              left: 0,
              width: "100%",
            }}
          >
            <span
              style={{ marginTop: "24px", color: "gray", fontSize: "24px" }}
            >
              No topic found
            </span>
          </Box>
        ) : (
          topic
            // eslint-disable-next-line
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (
                item.topic_name.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            // eslint-disable-next-line
            .filter((item) => {
              if (filtercategory === "all") {
                return item;
              } else if (item.category === filtercategory) {
                return item;
              }
            })
            .map((item, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <SyledCard
                  variant="outlined"
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className={focusedCardIndex === 0 ? "Mui-focused" : ""}
                >
                  <Link
                    to={`/${item.topic_id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardMedia
                      component="img"
                      alt="random picture"
                      image={`https://picsum.photos/800/450?random=${index}`}
                      sx={{
                        aspectRatio: "16 / 9",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      }}
                    />
                    <SyledCardContent>
                      <Typography
                        gutterBottom
                        variant="caption"
                        component="div"
                      >
                        {capitalize(item.category)}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        {item.topic_name}
                      </Typography>
                      <StyledTypography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{
                          whiteSpace: "pre-line", // Ensures new lines are respected
                          wordBreak: "break-word", // Breaks long words if needed
                          overflowWrap: "break-word", // Ensures proper wrapping for long text
                        }}
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
                        <Typography variant="caption">
                          {capitalize(userNames[item.user_id])}
                        </Typography>
                      </Box>
                      <Typography variant="caption">
                        {new Date(item.created_time).toLocaleString()}
                      </Typography>
                    </Box>
                  </Link>

                  {checkVaildUser(item.user_id) && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
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
            ))
        )}
      </Grid>
    </Box>
  );
}
