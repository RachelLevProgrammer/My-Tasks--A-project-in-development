import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Paper,
  Chip,
  Divider,
  Fade,
} from "@mui/material";
import {
  ArrowBack,
  Edit,
  Schedule,
  Category,
  Notifications,
  Email,
  Token,
} from "@mui/icons-material";
import axios from "axios";

const ReadTask = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const taskId = location.state?.taskId || location.state?.task?._id;
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log("taskId:", taskId);
    if (!taskId) {
      setError("No task ID provided");
      setLoading(false);
      return;
    }
  
    setLoading(true);
  
    axios.get(`http://localhost:8080/tasks/getTask/${taskId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("Response from server:", res);
      console.log("Response data:", res.data);
      if(res.data.task) {
        setCurrentTask(res.data.task);
      } else {
        setCurrentTask(res.data); // לנסות במקרה שאין תת-אובייקט task
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching task:", err);
      setError("Failed to load task");
      setLoading(false);
    });
  }, [taskId]);
    
  if (loading)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 10 }}>
        טוען משימה...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 10 }}>
        {error}
      </Typography>
    );
  if (!currentTask)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 10 }}>
        לא נמצאה משימה להצגה
      </Typography>
    );

  const getTaskTypeLabel = (type) =>
    ({
      reminder: "Reminder",
      meeting: "Meeting",
      call: "Call",
      course: "Course",
      birthday: "Birthday",
      other: "Other",
    }[type] || type);

  const getReminderMethodLabel = (method) =>
    ({
      email: "Email",
      notification: "Notification",
    }[method] || method);

  const handleEditTask = () => {
    navigate("/CreateTask", {
      state: {
        task: currentTask,
        isEdit: true,
        formattedDate: currentTask.date,
      },
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Task Details
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
        <Fade in timeout={600}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  mb: 4,
                  textAlign: "center",
                  background: "linear-gradient(45deg, #f5f5f5 30%, #e3f2fd 90%)",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  {currentTask.name}
                </Typography>
                <Chip
                  label={getTaskTypeLabel(currentTask.typeTask)}
                  sx={{
                    background: "linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    height: 36,
                  }}
                />
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 3, background: "#fffde7" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      <Schedule sx={{ mr: 1 }} /> Timing
                    </Typography>
                    <Typography variant="body1">
                      <strong>Start:</strong> {currentTask.startTime}
                    </Typography>
                    <Typography variant="body1">
                      <strong>End:</strong> {currentTask.endTime}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 3, background: "#f3e5f5" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      <Category sx={{ mr: 1 }} /> Type
                    </Typography>
                    <Typography variant="h6">
                      {getTaskTypeLabel(currentTask.typeTask)}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, background: "#e8f5e9" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {currentTask.wayOfActing === "email" ? (
                        <Email sx={{ mr: 1 }} />
                      ) : (
                        <Notifications sx={{ mr: 1 }} />
                      )}
                      Reminder Method
                    </Typography>
                    <Typography variant="body1">
                      {getReminderMethodLabel(currentTask.wayOfActing)}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Task Subject
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box
                      sx={{ lineHeight: 1.6 }}
                      dangerouslySetInnerHTML={{ __html: currentTask.issueTask }}
                    />
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Box textAlign="center" sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleEditTask}
                      startIcon={<Edit />}
                      sx={{
                        background:
                          "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                        },
                      }}
                    >
                      Edit Task
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default ReadTask;
