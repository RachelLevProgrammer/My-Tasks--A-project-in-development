// import React from 'react';
// import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

// const ReadAllTasksForToday = () => {
//   return (
//     // <Container sx={{ mt: 4 }}>
//     //   <Typography variant="h4">Tasks for Today</Typography>
//     //   <List>
//     //     {/* Map through today's tasks */}
//     //     <ListItem>
//     //       <ListItemText primary="Task Name" />
//     //       <Button variant="contained">Edit Task</Button>
//     //       <Button variant="contained">Delete Task</Button>
//     //     </ListItem>
//     //   </List>
//     //   <Button variant="contained">Add Task for Today</Button>
//     // </Container>
//     <h1>ReadAllTasksForToday</h1>
//   );
// };

// export default ReadAllTasksForToday;


import React, { useState } from 'react';
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Chip,
  Fade,
  Paper,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  Delete,
  Edit,
  Visibility,
  Today,
} from '@mui/icons-material';

const ReadAllTasksForToday = ({ onNavigate, selectedDate, setSelectedTask, isRTL }) => {
  // Mock tasks data
  const mockTasks = [
    {
      id: 1,
      name: isRTL ? 'פגישת עבודה' : 'Work Meeting',
      time: '09:00 - 10:30',
      type: 'meeting',
      emoji: '🤝',
      description: isRTL ? 'פגישה עם הצוות' : 'Team meeting discussion',
    },
    {
      id: 2,
      name: isRTL ? 'שיחה עם לקוח' : 'Client Call',
      time: '14:00 - 15:00',
      type: 'call',
      emoji: '📞',
      description: isRTL ? 'שיחה חשובה' : 'Important client call',
    },
    {
      id: 3,
      name: isRTL ? 'יום הולדת אמא' : "Mom's Birthday",
      time: '18:00',
      type: 'birthday',
      emoji: '🎂',
      description: isRTL ? 'לא לשכוח!' : "Don't forget!",
    },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString(isRTL ? 'he-IL' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleTaskAction = (action, task = null) => {
    switch (action) {
      case 'add':
        onNavigate('createTask');
        break;
      case 'view':
        setSelectedTask(task);
        onNavigate('readTask');
        break;
      case 'edit':
        setSelectedTask(task);
        onNavigate('createTask');
        break;
      case 'delete':
        // Mock delete - in real app would delete from state/database
        console.log('Delete task:', task.id);
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => onNavigate('calendar')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Today sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {isRTL ? 'משימות היום' : "Today's Tasks"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
        <Fade in timeout={600}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              {/* Date Header */}
              <Paper 
                elevation={3}
                sx={{ 
                  p: 3, 
                  mb: 4, 
                  textAlign: 'center',
                  background: 'linear-gradient(45deg, #f5f5f5 30%, #e3f2fd 90%)',
                }}
              >
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {isRTL ? 'תאריך:' : 'Date:'}
                </Typography>
                <Typography variant="h5" color="text.secondary" fontWeight={500}>
                  {formatDate(selectedDate)}
                </Typography>
              </Paper>

              {/* Action Buttons */}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={2.4}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleTaskAction('add')}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #388e3c 30%, #4caf50 90%)',
                      },
                    }}
                  >
                    {isRTL ? 'הוסף למשימה היום' : 'Add Task for Today'}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Delete />}
                    sx={{
                      py: 1.5,
                      borderColor: '#f44336',
                      color: '#f44336',
                      '&:hover': {
                        borderColor: '#d32f2f',
                        backgroundColor: 'rgba(244, 67, 54, 0.04)',
                      },
                    }}
                  >
                    {isRTL ? 'מחק משימה' : 'Delete Task'}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Edit />}
                    sx={{
                      py: 1.5,
                      borderColor: '#ff9800',
                      color: '#ff9800',
                      '&:hover': {
                        borderColor: '#f57c00',
                        backgroundColor: 'rgba(255, 152, 0, 0.04)',
                      },
                    }}
                  >
                    {isRTL ? 'עריכת משימה' : 'Edit Task'}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Visibility />}
                    sx={{
                      py: 1.5,
                      borderColor: '#2196f3',
                      color: '#2196f3',
                      '&:hover': {
                        borderColor: '#1976d2',
                        backgroundColor: 'rgba(33, 150, 243, 0.04)',
                      },
                    }}
                  >
                    {isRTL ? 'צפה במשימה' : 'View Task'}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={() => onNavigate('calendar')}
                    sx={{
                      py: 1.5,
                      borderColor: '#9c27b0',
                      color: '#9c27b0',
                      '&:hover': {
                        borderColor: '#7b1fa2',
                        backgroundColor: 'rgba(156, 39, 176, 0.04)',
                      },
                    }}
                  >
                    {isRTL ? 'חזור ללוח' : 'Return to Board'}
                  </Button>
                </Grid>
              </Grid>

              <Divider sx={{ mb: 4 }} />

              {/* Tasks List */}
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                {isRTL ? 'משימות להיום:' : 'Tasks for Today:'}
              </Typography>

              {mockTasks.length === 0 ? (
                <Paper 
                  elevation={1}
                  sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    background: 'linear-gradient(45deg, #fafafa 30%, #f5f5f5 90%)',
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    {isRTL ? 'אין משימות להיום' : 'No tasks for today'}
                  </Typography>
                </Paper>
              ) : (
                <List sx={{ width: '100%' }}>
                  {mockTasks.map((task, index) => (
                    <Fade in timeout={600 + index * 200} key={task.id}>
                      <Paper 
                        elevation={3}
                        sx={{ 
                          mb: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                          },
                        }}
                      >
                        <ListItem
                          sx={{ 
                            p: 3,
                            cursor: 'pointer',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #f5f5f5 30%, #e3f2fd 90%)',
                            },
                          }}
                          onClick={() => handleTaskAction('view', task)}
                        >
                          <ListItemIcon sx={{ minWidth: 56 }}>
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                              }}
                            >
                              {task.emoji}
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box display="flex" alignItems="center" gap={2}>
                                <Typography variant="h6" fontWeight={600}>
                                  {task.name}
                                </Typography>
                                <Chip
                                  label={task.time}
                                  size="small"
                                  sx={{
                                    background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
                                    color: 'white',
                                    fontWeight: 600,
                                  }}
                                />
                              </Box>
                            }
                            secondary={
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {task.description}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </Paper>
                    </Fade>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default ReadAllTasksForToday;
