// import React from 'react';
// import { Container, Typography, Button } from '@mui/material';

// const ReadTask = () => {
//   return (
//     <h1>ReadTask</h1>
//     // <Container sx={{ mt: 4 }}>
//     //   <Typography variant="h4">Task Details</Typography>
//     //   <Typography variant="body1">Task Name: Example Task</Typography>
//     //   <Typography variant="body1">From: 10:00 AM to 11:00 AM</Typography>
//     //   <Typography variant="body1">Task Type: Reminder</Typography>
//     //   <Typography variant="body1">Reminder Type: Email</Typography>
//     //   <Button variant="contained">Edit Task</Button>
//     // </Container>
//   );
// };

// export default ReadTask;
import React from 'react';
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

const ReadTask = ({ onNavigate, task, isRTL }) => {
  // Mock task data if none provided
  const defaultTask = {
    id: 1,
    name: isRTL ? 'פגישת עבודה' : 'Work Meeting',
    startTime: '09:00',
    endTime: '10:30',
    type: 'meeting',
    emoji: '🤝',
    reminderMethod: 'email',
    description: isRTL ? 'פגישה חשובה עם הצוות לדיון על הפרויקט החדש' : 'Important team meeting to discuss the new project',
    subject: isRTL ? 'דיון על פרויקט חדש והצגת התוכניות לרבעון הקרוב' : 'Discussion about new project and presentation of plans for the upcoming quarter',
  };

  const currentTask = task || defaultTask;

  const getTaskTypeLabel = (type) => {
    const types = {
      reminder: isRTL ? 'תזכורת' : 'Reminder',
      meeting: isRTL ? 'פגישה' : 'Meeting',
      call: isRTL ? 'שיחה' : 'Call',
      course: isRTL ? 'קורס' : 'Course',
      birthday: isRTL ? 'יום הולדת' : 'Birthday',
      other: isRTL ? 'אחר' : 'Other',
    };
    return types[type] || type;
  };

  const getReminderMethodLabel = (method) => {
    const methods = {
      email: isRTL ? 'אימייל' : 'Email',
      notification: isRTL ? 'התראה' : 'Notification',
    };
    return methods[method] || method;
  };

  const handleEditTask = () => {
    onNavigate('createTask');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => onNavigate('todayTasks')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {isRTL ? 'פרטי המשימה' : 'Task Details'}
          </Typography>
          <Button
            color="inherit"
            startIcon={<Edit />}
            onClick={handleEditTask}
          >
            {isRTL ? 'עריכה' : 'Edit Task'}
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
        <Fade in timeout={600}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              {/* Task Header */}
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
                    boxShadow: '0 8px 25px rgba(25,118,210,0.3)',
                  }}
                >
                  {currentTask.emoji}
                </Box>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  {currentTask.name}
                </Typography>
                <Chip
                  label={getTaskTypeLabel(currentTask.type)}
                  sx={{
                    background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    height: 36,
                  }}
                />
              </Paper>

              {/* Task Details Grid */}
              <Grid container spacing={3}>
                {/* Time Section */}
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: '100%',
                      background: 'linear-gradient(45deg, #fff3e0 30%, #ffe0b2 90%)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center', mb: 3 }}
                    >
                      <Schedule sx={{ mr: 1, color: '#ff9800' }} />
                      {isRTL ? 'זמנים' : 'Timing'}
                    </Typography>
                    <Box>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>{isRTL ? 'שעת התחלה:' : 'Start Time:'}</strong> {currentTask.startTime}
                      </Typography>
                      <Typography variant="body1">
                        <strong>{isRTL ? 'שעת סיום:' : 'End Time:'}</strong> {currentTask.endTime}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                {/* Task Type Section */}
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: '100%',
                      background: 'linear-gradient(45deg, #f3e5f5 30%, #e1bee7 90%)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center', mb: 3 }}
                    >
                      <Category sx={{ mr: 1, color: '#9c27b0' }} />
                      {isRTL ? 'סוג המשימה' : 'Task Type'}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="h4">{currentTask.emoji}</Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {getTaskTypeLabel(currentTask.type)}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                {/* Reminder Method Section */}
                <Grid item xs={12}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      background: 'linear-gradient(45deg, #e8f5e8 30%, #c8e6c9 90%)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center', mb: 3 }}
                    >
                      {currentTask.reminderMethod === 'email' ? (
                        <Email sx={{ mr: 1, color: '#4caf50' }} />
                      ) : (
                        <Notifications sx={{ mr: 1, color: '#4caf50' }} />
                      )}
                      {isRTL ? 'שיטת התזכורת' : 'Reminder Method'}
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {getReminderMethodLabel(currentTask.reminderMethod)}
                    </Typography>
                  </Paper>
                </Grid>

                {/* Task Subject Section */}
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                      {isRTL ? 'נושא המשימה' : 'Task Subject'}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                        color: 'text.secondary',
                      }}
                    >
                      {currentTask.subject || currentTask.description}
                    </Typography>
                  </Paper>
                </Grid>

                {/* Action Button */}
                <Grid item xs={12}>
                  <Box textAlign="center" sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleEditTask}
                      startIcon={<Edit />}
                      sx={{
                        px: 6,
                        py: 2,
                        fontSize: '1.2rem',
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                        },
                      }}
                    >
                      {isRTL ? 'עריכת המשימה' : 'Edit Task'}
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