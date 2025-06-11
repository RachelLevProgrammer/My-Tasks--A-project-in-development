import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

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
  Today,
  Translate,
  ArrowBack,
  ArrowForward,
  CalendarToday,
} from '@mui/icons-material';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CalendarComponent = ({ isRTL, setIsRTL }) => {
  const username = useSelector((state) => state.user.username);
  const useremail = useSelector((state) => state.user.useremail);
  const token = useSelector((state) => state.user.token);
  const UserCalendars = useSelector((state) => state.user.calendar);
  const dispatch = useDispatch(); 
  const [userTasks, setUserTasks] = useState(null);


  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tasksData, setTasksData] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [ThisDate, setThisDate] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchTasks = () => {
      const initialTasksData = {};
      for (const task of UserCalendars) {
        const innerTask = Array.isArray(task) ? task[0] : task;
        if (!innerTask || !innerTask.date) continue;
  
        const dateValue = new Date(innerTask.date);
        if (!isNaN(dateValue.getTime())) {
          const taskDate = formatDateKey(dateValue);
          if (!initialTasksData[taskDate]) {
            initialTasksData[taskDate] = [];
          }
          initialTasksData[taskDate].push(Array.isArray(task) ? task[0] : task);
        }
      }
      setTasksData(initialTasksData);
    };
    fetchTasks();
  }, [UserCalendars]);


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


  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  const handleDayClick = (date) => {
    setSelectedDay(date);
    setThisDate(date); 
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleAddTask = () => {
    const formattedDate = formatDateKey(selectedDay);
    const today = new Date();
    if (selectedDay < today) {
      alert("אא להוסיף משימה לתאריך שחלף");
      return; 
    }
    navigate('/CreateTask', { state: { formattedDate: formattedDate, username: username, useremail: useremail, token: token } });
  };

  const handleShowTasksForToday = () => {
    
    if (!selectedDay) return;
  
    const formattedDate = formatDateKey(selectedDay);
    const tasksForToday = tasksData[formattedDate] || [];
  
    navigate('/ReadAllTasksForToday', {
      state: {
        tasks: tasksForToday, 
        date: formattedDate
      }
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
          
          {/* <Button
            color="inherit"
            startIcon={<Translate />}
            onClick={() => setIsRTL(!isRTL)}
            sx={{ mr: 1 }}
          >
            {isRTL ? 'English' : 'עברית'}
          </Button> */}
          
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
                {isRTL ? 'המשימות להיום' : " Tasks for Today"}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
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
                        className="calendar-day"
                        elevation={2}
                        sx={{
                          p: 2,
                          minHeight: 80,
                          cursor: 'pointer',
                          border: selectedDay && date.toDateString() === selectedDay.toDateString() ? '2px solid black' : 'none',
                          background: date.toDateString() === new Date().toDateString() 
                            ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                            : 'white',
                          color: date.toDateString() === new Date().toDateString() ? 'white' : 'inherit',
                        }}
                        onClick={() => {
                          handleDayClick(date);
                          setSelectedDay(date);
                        }}
                      >
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <Typography variant="h6" fontWeight={600}>
                            {date.getDate()}
                          </Typography>
                          {tasksData[formatDateKey(date)] && (
                            <Chip
                              label={`${tasksData[formatDateKey(date)].length} tasks`}
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
