import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Paper,
  Fade,
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Schedule,
  Title,
  Category,
  Notifications,
  Email,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { setUserData } from '../store/userSlice';

const CreateTask = ({ onNavigate, isRTL }) => {
  const username = useSelector((state) => state.user.username);
  const useremail = useSelector((state) => state.user.useremail);
  const calendar = useSelector((state) => state.user.calendar);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { formattedDate } = location.state || {};
  const [IsEdit, setIsEdit] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
  const [taskData, setTaskData] = useState({
    taskName: '',
    taskSubject: '',
    startTime: '',
    endTime: '',
    taskType: '',
    reminderMethod: '',
    reminderSound: '',
    date: '',
    _id: '',
  });
  

  useEffect(() => {
    const taskFromLocation = location.state?.task;
    const isEditMode = location.state?.isEdit || false;
    const formattedDate = location.state?.formattedDate || '';
  
    setIsEdit(isEditMode);
  
    if (taskFromLocation) {
      setTaskData({
        taskName: taskFromLocation?.name || '',
        taskSubject: taskFromLocation?.issueTask || '',
        startTime: taskFromLocation?.startTime || '',
        endTime: taskFromLocation?.endTime || '',
        taskType: taskFromLocation?.typeTask || '',
        reminderMethod: taskFromLocation?.wayOfActing || '',
        reminderSound: taskFromLocation?.reminderSound || '',
        date: taskFromLocation?.date || formattedDate || '',
        _id: taskFromLocation?._id || '',
      });
    } else if (formattedDate) {
      setTaskData(prev => ({ ...prev, date: formattedDate }));
    }
  }, [location.state]);
      
  const taskTypes = [
    { value: 'reminder', label: isRTL ? 'תזכורת' : 'Reminder', emoji: '⏰' },
    { value: 'meeting', label: isRTL ? 'פגישה' : 'Meeting', emoji: '🤝' },
    { value: 'call', label: isRTL ? 'שיחה' : 'Call', emoji: '📞' },
    { value: 'course', label: isRTL ? 'קורס' : 'Course', emoji: '📚' },
    { value: 'birthday', label: isRTL ? 'יום הולדת' : 'Birthday', emoji: '🎂' },
    { value: 'other', label: isRTL ? 'אחר' : 'Other', emoji: '📝' },
  ];

  const reminderMethods = [
    { value: 'email', label: isRTL ? 'אימייל' : 'Email', icon: <Email /> },
    { value: 'notification', label: isRTL ? 'התראה' : 'Notification', icon: <Notifications /> },
  ];

  const handleInputChange = (field) => (event) => {
    setTaskData({
      ...taskData,
      [field]: event.target.value,
    });
  };

  const handleSubjectChange = (value) => {
    setTaskData({
      ...taskData,
      taskSubject: value,
    });
  };

  const handleSaveTask = async () => {
    const dataToSend = {
      userEmail: useremail,
      name: taskData.taskName,
      date: taskData.date,
      startTime: taskData.startTime,
      endTime: taskData.endTime,
      issueTask: taskData.taskSubject,
      typeTask: taskData.taskType,
      wayOfActing: taskData.reminderMethod,
      time: taskData.startTime,
      emoji: '',
    };

    try {
      if (IsEdit) {
        if (!taskData._id) {
          alert('Missing task ID');
          return;
        }

        const response = await axios.put(
          `http://localhost:8080/tasks/updateTask/${taskData._id}`,
          dataToSend,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200 || response.status === 201) {
          // השתמש בנתונים שהתקבלו מהשרת לעדכון הלוח השנה
          const updatedTask = response.data.updatedTask || response.data.task || response.data;
          const updatedCalendar = calendar.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          );

          dispatch(setUserData({
            username,
            useremail,
            token,
            calendar: updatedCalendar,
          }));

          // ניווט חזרה עם הנתונים המעודכנים
          navigate('/CalendarComponent');
        } else {
          alert(isRTL ? 'השרת החזיר שגיאה' : 'Server returned an error');
        }
      } else {
        const response = await axios.post(
          'http://localhost:8080/tasks/createTask',
          dataToSend,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 201) {
          const newTask = response.data.newTask || response.data.task || response.data;

          dispatch(setUserData({
            username,
            useremail,
            token,
            calendar: [...calendar, newTask],
          }));

          navigate('/CalendarComponent');
        } else {
          alert(isRTL ? 'השרת החזיר שגיאה' : 'Server returned an error');
        }
      }
    } catch (error) {
      console.error('Error saving task:', error?.response?.data || error.message || error);
      alert(
        isRTL
          ? `שגיאה בשמירת המשימה: ${error?.response?.data?.message || error.message}`
          : `Task save failed: ${error?.response?.data?.message || error.message}`
      );
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ font: [] }, { size: [] }],
      ['clean'],
    ],
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {isRTL ? 'הוספת תזכורת חדשה' : 'Adding New Reminder'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
        <Fade in timeout={600}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  textAlign: 'center',
                  mb: 4,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 700,
                }}
              >
                {isRTL ? 'הוספת תזכורת חדשה' : 'Adding New Reminder'}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Schedule sx={{ mr: 1 }} />
                      {isRTL ? 'זמנים' : 'Timing'}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={isRTL ? 'שעת התחלה' : 'Start Time'}
                          type="time"
                          value={taskData.startTime}
                          onChange={handleInputChange('startTime')}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={isRTL ? 'שעת סיום' : 'End Time'}
                          type="time"
                          value={taskData.endTime}
                          onChange={handleInputChange('endTime')}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Title sx={{ mr: 1 }} />
                      {isRTL ? 'פרטי המשימה' : 'Task Details'}
                    </Typography>

                    <TextField
                      fullWidth
                      label={isRTL ? 'שם המשימה' : 'Task Name'}
                      value={taskData.taskName}
                      onChange={handleInputChange('taskName')}
                      sx={{ mb: 3 }}
                    />

                    <Typography variant="subtitle1" gutterBottom>
                      {isRTL ? 'נושא המשימה' : 'Task Subject'}
                    </Typography>
                    <Box sx={{ mb: 3, '& .ql-editor': { minHeight: '150px' } }}>
                      <ReactQuill
                        value={taskData.taskSubject}
                        onChange={handleSubjectChange}
                        modules={quillModules}
                        theme="snow"
                        placeholder={isRTL ? 'הכנס את נושא המשימה...' : 'Enter task subject...'}
                      />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Category sx={{ mr: 1 }} />
                      {isRTL ? 'סוג המשימה' : 'Task Type'}
                    </Typography>

                    <Grid container spacing={2}>
                      {taskTypes.map((type) => (
                        <Grid item xs={6} sm={4} key={type.value}>
                          <Paper
                            elevation={taskData.taskType === type.value ? 8 : 2}
                            sx={{
                              p: 2,
                              textAlign: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              background: taskData.taskType === type.value
                                ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                                : 'white',
                              color: taskData.taskType === type.value ? 'white' : 'inherit',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                              },
                            }}
                            onClick={() => setTaskData({ ...taskData, taskType: type.value })}
                          >
                            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                              {type.emoji}
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {type.label}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Notifications sx={{ mr: 1 }} />
                      {isRTL ? 'שיטת התזכורת' : 'Reminder Method'}
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {reminderMethods.map((method) => (
                        <Grid item xs={12} sm={6} key={method.value}>
                          <Paper
                            elevation={taskData.reminderMethod === method.value ? 8 : 2}
                            sx={{
                              p: 3,
                              textAlign: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              background: taskData.reminderMethod === method.value
                                ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                                : 'white',
                              color: taskData.reminderMethod === method.value ? 'white' : 'inherit',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 1,
                              fontWeight: 600,
                              fontSize: '1.1rem',
                              userSelect: 'none',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                              },
                            }}
                            onClick={() => setTaskData({ ...taskData, reminderMethod: method.value })}
                          >
                            {method.icon}
                            {method.label}
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Save />}
                    onClick={handleSaveTask}
                    sx={{
                      fontWeight: 700,
                      px: 5,
                      py: 1.5,
                      boxShadow: '0 4px 20px rgba(25, 118, 210, 0.4)',
                      '&:hover': {
                        boxShadow: '0 8px 30px rgba(25, 118, 210, 0.6)',
                      },
                    }}
                  >
                    {IsEdit ? (isRTL ? 'עדכון משימה' : 'Update Task') : (isRTL ? 'שמירת משימה' : 'Save Task')}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default CreateTask;
