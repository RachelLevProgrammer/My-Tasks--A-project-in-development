import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useDeleteTask from '../hooks/useDeleteTask';

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
  Delete,
  Edit,
  Visibility,
  Today,
} from '@mui/icons-material';

const ReadAllTasksForToday = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mockTasks, setMockTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const isRTL = false;

  const date = location.state?.date ? new Date(location.state.date) : new Date();

  const formatDate = (date) => date.toLocaleDateString();

  const deleteTaskFromServer = useDeleteTask(mockTasks, setMockTasks, setSelectedTask);

  useEffect(() => {
    if (location.state?.tasks?.length > 0) {
      setMockTasks(location.state.tasks);
    }
  }, [location.state]);

  const handleTaskAction = async (action, task = null) => {
    if (!task) {
      alert(isRTL ? 'לא נבחרה משימה' : 'No task selected');
      return;
    }

    switch (action) {
      case 'view':
        navigate('/ReadTask', { state: { task } });
        break;

      case 'edit':
        navigate('/CreateTask', {
          state: {
            task,
            isEdit: true,
            formattedDate: task.date,
          },
        });
        break;

      case 'delete':
        const confirmed = window.confirm(
          isRTL
            ? 'האם אתה בטוח שברצונך למחוק משימה זו?'
            : 'Are you sure you want to delete this task?'
        );
        if (confirmed) await deleteTaskFromServer(task._id);
        break;

      default:
        break;
    }
  };

  const handleTaskClick = (task) => {
    const actualTask = Array.isArray(task) ? task[0] : task;
    setSelectedTask(actualTask);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)' }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/CalendarComponent')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Today sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {isRTL ? 'משימות היום' : "Today's Tasks"}
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
                  p: 3,
                  mb: 4,
                  textAlign: 'center',
                  background: 'linear-gradient(45deg, #f5f5f5 30%, #e3f2fd 90%)',
                }}
              >
                <Typography
                  variant="h4"
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
                  {formatDate(date)}
                </Typography>
              </Paper>

              <Grid container spacing={2} sx={{ mb: 4 }}>
                {[
                  { icon: <Delete />, label: 'Delete Task', color: '#f44336', action: 'delete' },
                  { icon: <Edit />, label: 'Edit Task', color: '#ff9800', action: 'edit' },
                  { icon: <Visibility />, label: 'View Task', color: '#2196f3', action: 'view' },
                  { icon: <ArrowBack />, label: 'Return to Board', color: '#9c27b0', action: 'back' },
                ].map((btn, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={btn.icon}
                      onClick={() =>
                        btn.action === 'back'
                          ? navigate('/CalendarComponent')
                          : handleTaskAction(btn.action, selectedTask)
                      }
                      sx={{
                        py: 1.5,
                        borderColor: btn.color,
                        color: btn.color,
                        '&:hover': {
                          borderColor: btn.color.replace('f', 'd'),
                          backgroundColor: `${btn.color}10`,
                        },
                      }}
                    >
                      {isRTL ? btn.label : btn.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ mb: 4 }} />

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
                  {mockTasks.map((task, index) => {
                    const current = Array.isArray(task) ? task[0] : task;
                    return (
                      <Fade in timeout={600 + index * 200} key={current?._id || index}>
                        <Paper elevation={3} sx={{ mb: 2 }}>
                          <ListItem
                            onClick={() => handleTaskClick(task)}
                            sx={{
                              p: 3,
                              cursor: 'pointer',
                              border:
                                selectedTask?._id === current._id ? '2px solid black' : '1px solid transparent',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #f5f5f5 30%, #e3f2fd 90%)',
                              },
                            }}
                          >
                            <ListItemIcon>
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: '50%',
                                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '1.8rem',
                                }}
                              >
                                {current.emoji || '📌'}
                              </Box>
                            </ListItemIcon>

                            <ListItemText
                              primary={
                                <Box display="flex" alignItems="center" gap={2}>
                                  <Typography variant="h6" fontWeight={600}>
                                    {current.name || 'No Name'}
                                  </Typography>
                                  {current.startTime && (
                                    <Chip
                                      label={current.startTime}
                                      size="small"
                                      sx={{
                                        background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
                                        color: 'white',
                                        fontWeight: 600,
                                      }}
                                    />
                                  )}
                                </Box>
                              }
                            />
                          </ListItem>
                        </Paper>
                      </Fade>
                    );
                  })}
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
