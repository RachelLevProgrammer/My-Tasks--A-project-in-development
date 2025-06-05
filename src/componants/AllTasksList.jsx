import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Fade,
  Paper,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const AllTasksList = ({ tasks, isRTL }) => {
  const navigate = useNavigate();

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
            {isRTL ? 'רשימת כל המשימות' : 'All Tasks List'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              {isRTL ? 'כל המשימות:' : 'All Tasks:'}
            </Typography>

            {tasks.length === 0 ? (
              <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  {isRTL ? 'אין משימות' : 'No tasks available'}
                </Typography>
              </Paper>
            ) : (
              <List sx={{ width: '100%' }}>
                {tasks.map((task, index) => (
                  <Fade in timeout={600 + index * 200} key={task.id}>
                    <Paper elevation={3} sx={{ mb: 2 }}>
                      <ListItem sx={{ p: 3, cursor: 'pointer' }}>
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
      </Container>
    </Box>
  );
};

export default AllTasksList;

