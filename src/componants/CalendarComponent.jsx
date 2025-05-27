import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const CalendarComponent = ({ onNavigate, isRTL, setIsRTL }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tasksData, setTasksData] = useState({
    '2024-01-15': [],
    '2024-01-20': [],
    '2024-01-25': [],
  });
  const [newTask, setNewTask] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate = useNavigate();

  const daysOfWeek = isRTL 
    ? ['ש', 'ו', 'ה', 'ד', 'ג', 'ב', 'א']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthNames = isRTL
    ? ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];

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
    return date.toISOString().split('T')[0];
  };

  const handleDayClick = (date) => {
    setSelectedDay(date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const days = getDaysInMonth(currentMonth);
  
  const handleAddTask = () => {
    const formattedDate = formatDateKey(selectedDay);

    navigate('/CreateTask', { state: {formattedDate:formattedDate  } });
    // if (newTask.trim()) {
    //   setTasksData((prev) => ({
    //     ...prev,
    //     [formattedDate]: [...(prev[formattedDate] || []), newTask],
    //   }));
    //   setNewTask('');
    //   setSelectedDay(null);
    // }
  };

  const handleShowTasks = (date) => {
    handleDayClick(date);
  };

  const handleClickOutside = (event) => {
    const isButton = event.target.closest('button');
    if (!event.target.closest('.calendar-day') && !isButton) {
      setSelectedDay(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
            startIcon={<Translate />}
            onClick={() => setIsRTL(!isRTL)}
            sx={{ mr: 1 }}
          >
            {isRTL ? 'English' : 'עברית'}
          </Button>
          
          {selectedDay && (
            <Button
              color="inherit"
              startIcon={<Add />}
              onClick={handleAddTask}
              sx={{ mr: 1 }}
            >
              {isRTL ? 'הוסף משימה' : 'Add Task'}
            </Button>
          )}
          
          <Button
            color="inherit"
            startIcon={<Today />}
            onClick={() => {
              setSelectedDay(new Date());
              onNavigate('todayTasks');
            }}
          >
            {isRTL ? 'מסך היום' : "Today's Screen"}
          </Button>
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
                          handleShowTasks(date);
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
