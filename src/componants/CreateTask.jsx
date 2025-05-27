// import React from 'react';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';

// const CreateNewTask = () => {
//   return (
//     <h1>CreateNewTask</h1>
//     // <Container sx={{ mt: 4 }}>
//     //   <Typography variant="h4">Add New Reminder</Typography>
//     //   <TextField fullWidth label="Start Time" type="time" variant="outlined" margin="normal" />
//     //   <TextField fullWidth label="End Time" type="time" variant="outlined" margin="normal" />
//     //   <TextField fullWidth label="Task Name" variant="outlined" margin="normal" />
//     //   <TextField fullWidth label="Task Subject" variant="outlined" margin="normal" />
//     //   <TextField select fullWidth label="Task Type" variant="outlined" margin="normal">
//     //     {/* Map through task types with emojis here */}
//     //   </TextField>
//     //   <Button variant="contained" sx={{ mt: 2 }}>Save Task</Button>
//     // </Container>
//   );
// };

// export default CreateNewTask;
import React, { useState } from 'react';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  Paper,
  Fade,
  Divider,
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateTask = ({ onNavigate, selectedDate, isRTL }) => {
  const [taskData, setTaskData] = useState({
    startTime: '',
    endTime: '',
    taskName: '',
    taskSubject: '',
    taskType: '',
    reminderMethod: '',
    reminderSound: '',
  });

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

  const handleSaveTask = () => {
    // Mock save - navigate back to calendar
    onNavigate('calendar');
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }, { 'size': [] }],
      ['clean']
    ],
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
                {/* Time Section */}
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(45deg, #f5f5f5 30%, #e3f2fd 90%)' }}>
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

                {/* Task Details Section */}
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

                {/* Task Type Section */}
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(45deg, #fff3e0 30%, #ffe0b2 90%)' }}>
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

                {/* Reminder Method Section */}
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(45deg, #f3e5f5 30%, #e1bee7 90%)' }}>
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
                                ? 'linear-gradient(45deg, #f50057 30%, #ff5983 90%)'
                                : 'white',
                              color: taskData.reminderMethod === method.value ? 'white' : 'inherit',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                              },
                            }}
                            onClick={() => setTaskData({ ...taskData, reminderMethod: method.value })}
                          >
                            <Box sx={{ mb: 1 }}>{method.icon}</Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {method.label}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>

                    {taskData.reminderMethod === 'notification' && (
                      <TextField
                        fullWidth
                        label={isRTL ? 'בחר קובץ שמע' : 'Choose Sound File'}
                        type="file"
                        accept="audio/*"
                        onChange={handleInputChange('reminderSound')}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  </Paper>
                </Grid>

                {/* Save Button */}
                <Grid item xs={12}>
                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleSaveTask}
                      startIcon={<Save />}
                      sx={{
                        px: 6,
                        py: 2,
                        fontSize: '1.2rem',
                        background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #388e3c 30%, #4caf50 90%)',
                        },
                      }}
                    >
                      {isRTL ? 'שמור משימה' : 'Save Task'}
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

export default CreateTask;
