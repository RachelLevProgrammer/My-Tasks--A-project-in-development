import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
  Chip,
  Fade,
  Grid,
  Paper,
} from '@mui/material';
import {
  Add,
  ArrowBack,
  ArrowForward,
  CalendarToday,
} from '@mui/icons-material';

import { setUserData } from '../store/userSlice';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CalendarComponent = ({ isRTL, setIsRTL }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useSelector((state) => state.user.username);
  const useremail = useSelector((state) => state.user.useremail);
  const UserCalendars = useSelector((state) => state.user.calendar);
  const token = localStorage.getItem('token');

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tasksData, setTasksData] = useState({});
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [error, setError] = useState(null);

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const loadTasks = tasksArray => {
    const m = {};
    tasksArray.forEach(task => {
      const d = formatDateKey(new Date(task.date));
      if (!m[d]) m[d] = [];
      m[d].push(task);
    });
    setTasksData(m);
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!username && localUser?._id) {
      dispatch(setUserData(localUser));
    }
  }, [username, dispatch]);


  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:8080/tasks/getTasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        loadTasks(res.data);
      } catch (e) {
        console.error('Error loading tasks', e);
        setError('שגיאה בטעינת המשימות');
      }
    };
    fetchTasks();
  }, [token]);

  useEffect(() => {
    if (username) {
      localStorage.setItem('user', JSON.stringify({
        username, useremail, calendar: UserCalendars, token
      }));
    }
  }, [username, useremail, UserCalendars, token]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const handleDayClick = (date) => {
    setSelectedDay(date);
    setError(null);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleAddTask = () => {
    if (!selectedDay) {
      setError('אנא בחר יום קודם להוספת משימה');
      return;
    }

    const formattedDate = formatDateKey(selectedDay);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(selectedDay);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('לא ניתן להוסיף משימה לתאריך שחלף');
      return;
    }

    setError(null);
    navigate('/CreateTask', {
      state: { formattedDate, username, useremail, token }
    });
  };

  const handleShowTasksForToday = () => {
    if (!selectedDay) {
      setError('אנא בחר יום כדי לראות את המשימות');
      return;
    }

    const formattedDate = formatDateKey(selectedDay);
    const tasksForToday = tasksData[formattedDate] || [];

    navigate('/ReadAllTasksForToday', {
      state: { tasks: tasksForToday, date: formattedDate }
    });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)' }}>
        <Toolbar>
          <CalendarToday sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            TaskCal Calendar
          </Typography>

          <Button
            color="inherit"
            onClick={() => navigate('/ReadAllTasksForToday', { state: { tasks: UserCalendars } })}
            sx={{ mr: 1 }}
          >
            {isRTL ? 'כל המשימות שלי' : 'All My Tasks'}
          </Button>

          {selectedDay && (
            <>
              <Button
                color="inherit"
                startIcon={<Add />}
                onClick={handleAddTask}
                sx={{ mr: 1 }}
              >
                {isRTL ? 'הוסף משימה' : 'Add Task'}
              </Button>
              <Button
                color="inherit"
                onClick={handleShowTasksForToday}
                sx={{ mr: 1 }}
              >
                {isRTL ? 'המשימות להיום' : 'Tasks for Today'}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
        {error && (
          <Typography color="error" mb={2} align="center" fontWeight={600}>
            {error}
          </Typography>
        )}
        <Fade in timeout={600}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <IconButton onClick={handlePrevMonth}>
                  <ArrowBack />
                </IconButton>

                <Typography variant="h4" component="h2">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </Typography>

                <IconButton onClick={handleNextMonth}>
                  <ArrowForward />
                </IconButton>
              </Box>

              <Grid container spacing={1}>
                {days.map((date, index) => (
                  <Grid item xs key={index}>
                    {date ? (
                      <Paper
                        elevation={selectedDay && date.toDateString() === selectedDay.toDateString() ? 8 : 2}
                        sx={{
                          p: 2,
                          minHeight: 80,
                          cursor: 'pointer',
                          border: selectedDay && date.toDateString() === selectedDay.toDateString()
                            ? '2px solid black' : 'none',
                          background: date.toDateString() === new Date().toDateString()
                            ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                            : 'white',
                          color: date.toDateString() === new Date().toDateString() ? 'white' : 'inherit',
                          transition: 'background-color 0.3s',
                        }}
                        onClick={() => handleDayClick(date)}
                      >
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <Typography variant="h6" fontWeight={600}>
                            {date.getDate()}
                          </Typography>
                          {tasksData[formatDateKey(date)] && (
                            <Chip
                              label={`${tasksData[formatDateKey(date)].length} משימות`}
                              size="small"
                              sx={{
                                mt: 1,
                                background: 'linear-gradient(45deg, #f50057 30%, #ff5983 90%)',
                                color: 'white',
                                fontSize: '0.7rem',
                              }}
                            />
                          )}
                        </Box>
                      </Paper>
                    ) : (
                      <Box sx={{ minHeight: 80 }} />
                    )}
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default CalendarComponent;
