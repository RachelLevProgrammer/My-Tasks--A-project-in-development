import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Schedule,
  Category,
  Notifications,
  Email,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const ReadTask = () => {
  const location = useLocation();
  const task = location.state.task;
  // const [task, setTask] = useState(null);
const userTasks=useSelector((state)=>state.user.calendar)

// useEffect(() => {
//   if (taskId && userTasks && userTasks.length > 0) {
//     const foundTask = userTasks.find(t => t.id === taskId);
//     setTask(foundTask || null);
//   }
// }, [taskId, userTasks]);
  
    const getTaskTypeLabel = (type) => {
    const types = {
      reminder: 'Reminder',
      meeting: 'Meeting',
      call: 'Call',
      course: 'Course',
      birthday: 'Birthday',
      other: 'Other',
    };
    return types[type] || type;
  };

  const getReminderMethodLabel = (method) => {
    const methods = {
      email: 'Email',
      notification: 'Notification',
    };
    return methods[method] || method;
  };

  const handleEditTask = () => {
    // לדוגמה: ניווט לעריכת משימה
  };

   
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => window.history.back()}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Task Details
          </Typography>
          <Button color="inherit" startIcon={<Edit />} onClick={handleEditTask}>
            Edit Task
          </Button>
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
                  textAlign: 'center',
                  background: 'linear-gradient(45deg, #f5f5f5 30%, #e3f2fd 90%)',
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    margin: '0 auto 16px auto',
                  }}
                >
                  {/* {task.emoji} */}
                </Box>
                <Typography variant="h3" sx={{
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 700,
                  mb: 2,
                }}>
                  {task.name}
                </Typography>
                <Chip
                  label={getTaskTypeLabel(task.typeTask)}
                  sx={{
                    background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    height: 36,
                  }}
                />
              </Paper>

              <Grid container spacing={3}>
                {/* Timing */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 3, background: '#fffde7' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      <Schedule sx={{ mr: 1 }} /> Timing
                    </Typography>
                    <Typography variant="body1"><strong>Start:</strong> {task.startTime}</Typography>
                    <Typography variant="body1"><strong>End:</strong> {task.endTime}</Typography>
                  </Paper>
                </Grid>

                {/* Type */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 3, background: '#f3e5f5' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      <Category sx={{ mr: 1 }} /> Type
                    </Typography>
                    <Typography variant="h6">{getTaskTypeLabel(task.typeTask)}</Typography>
                  </Paper>
                </Grid>

                {/* Reminder */}
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, background: '#e8f5e9' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {task.wayOfActing === 'email' ? <Email sx={{ mr: 1 }} /> : <Notifications sx={{ mr: 1 }} />}
                      Reminder Method
                    </Typography>
                    <Typography variant="body1">{getReminderMethodLabel(task.wayOfActing)}</Typography>
                  </Paper>
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>Task Subject</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {task.issueTask.text || task.issueTask}
                    </Typography>
                  </Paper>
                </Grid>

                {/* Edit button */}
                <Grid item xs={12}>
                  <Box textAlign="center" sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleEditTask}
                      startIcon={<Edit />}
                      sx={{
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
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
