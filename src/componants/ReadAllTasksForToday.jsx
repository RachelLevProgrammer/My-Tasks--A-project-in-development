import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCalendar } from '../store/userSlice'; // הנח שזו הפעולה לעדכון היומן
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
  Add,
  Delete,
  Edit,
  Visibility,
  Today,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const ReadAllTasksForToday = () => {

  const dispatch = useDispatch(); // ודא שזה למעלה
  const navigate = useNavigate();
  const location = useLocation();
  const [mockTasks, setMockTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  
  // הגדרות נוספות
  const isRTL = false; // או true אם אתה רוצה להשתמש בכיוון RTL
  const date = new Date(location.state.date); // אם date הוא מחרוזת תאריך
  const formatDate = (date) => date.toLocaleDateString(); // פונקציה לעיצוב תאריך

  const deleteTaskFromServer = useDeleteTask(mockTasks, setMockTasks, setSelectedTask);


    const handleTaskAction = async (action, task = null) => {
    if (!task) {
      console.error('No task provided');
      return;
    }
  
    switch (action) {
      case 'view':
        navigate('/ReadTask', {
          state: { task: task }
        });
        break;
        case 'edit':
          navigate('/CreateTask', {
            state: { 
              task: {
                name: task.name,
                startTime: task.startTime,
                endTime: task.endTime,
                issueTask: task.issueTask,
                typeTask: task.typeTask,
                wayOfActing: task.wayOfActing,
                emoji: task.emoji,
              },
            },
          });
          break;
          case 'delete':
            const current = Array.isArray(task) ? task[0] : task;
            if (!current || !current._id) return alert('No task selected');
            const confirmed = window.confirm('Are you sure you want to delete this task?');
            if (confirmed) {
              await deleteTaskFromServer(current._id);
            }
            break;
                default:
        break;
    }
  };
    
  useEffect(() => {
    if (location.state && location.state.tasks && location.state.tasks.length > 0) {
      setMockTasks(location.state.tasks);
    }
    // אל תכניסי userTasks ל-deps!
  }, [location.state]);
  
  


  const handleTaskClick = (task) => {
    debugger
    setSelectedTask(task); 
  };
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)' }}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
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
                  {/* ........ */}
                  {formatDate(date)}
                </Typography>
              </Paper>

              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={2.4}>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={() => handleTaskAction('delete', selectedTask)}
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
                    onClick={() => handleTaskAction('edit', selectedTask)}
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
                    onClick={() => handleTaskAction('view', selectedTask)}
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
                    onClick={() => navigate('/CalendarComponent')}
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
    <Fade in timeout={600 + index * 200} key={current?._id}>
      <Paper elevation={3} sx={{ mb: 2 }}>
        <ListItem
          onClick={() => handleTaskClick(task)}
          sx={{
            p: 3,
            cursor: 'pointer',
            border: selectedTask && (Array.isArray(selectedTask) ? selectedTask[0]?._id : selectedTask._id) === current._id
              ? '2px solid black'
              : 'none',
            '&:hover': {
              background: 'linear-gradient(45deg, #f5f5f5 30%, #e3f2fd 90%)',
            },
          }}
        >
          <ListItemIcon>
            <Box sx={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              {current.emoji}
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h6" fontWeight={600}>
                  {current.name}
                </Typography>
                <Chip label={current.startTime} size="small" sx={{
                  background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
                  color: 'white',
                  fontWeight: 600,
                }} />
              </Box>
            }
          />
        </ListItem>
      </Paper>
    </Fade>
  );
})}

</List>              )}
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default ReadAllTasksForToday;
