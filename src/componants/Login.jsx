import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  Fade,
  Zoom,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Google,
  Visibility,
  VisibilityOff,
  CalendarToday,
} from '@mui/icons-material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    debugger
    console.log(formData);
    if (!isLogin) {
      // SIGN UP
      const dataToSend = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
  
      try {
        debugger
        const response = await axios.post('http://localhost:8080/users/register', dataToSend);
        dispatch(setUserData({ 
          username: response.data.username,
          useremail:response.data.email

      }));
      console.log('הרשמה הצליחה:', response.data);

        navigate('/CalendarComponent', { state: {username: response.data.username, useremail: response.data.email } });
      } catch (error) {
        console.log("error", error.response ? error.response.data : error.message);
      }
    } else {
      // LOGIN

      try {
        debugger
        const LoginDataToSend = {
          email: formData.email,
          password: formData.password,
        };  
        // const response = await axios.post('http://localhost:8080/users/login', LoginDataToSend);
        // dispatch(setUserData({ username: response.data.username, useremail: formData.email }));
        // console.log('התחברות הצליחה:', response.data);
        // navigate('/CalendarComponent', { state: { userId: response.data.userId, email: formData.email } });
        const response = await axios.post('http://localhost:8080/users/login', LoginDataToSend);
        dispatch(setUserData({ 
          // userId: response.data.userId, // שמירת userId בסלייס
            username: response.data.username, 
            useremail:response.data.email, 
        }));
        console.log('התחברות הצליחה:', response.data);
        navigate('/CalendarComponent', { state:{username:response.data.username, useremail:response.data.email}});
      

      } catch (error) {
        console.log("error", error.response ? error.response.data : error.message);
      }
    }
  };

  const responseGoogle = async (response) => {
    debugger
    console.log(response);
    
    // בדוק אם response מכיל את profileObj
    if (response && response.profileObj) {
      const { profileObj } = response; // קבלת פרטי המשתמש
  
      // הכנת הנתונים לשליחה לשרת
      const dataToSend = {
        username: profileObj.name,
        email: profileObj.email,
      };
  
      try {
        // שליחת הנתונים לשרת
        const res = await axios.post('http://localhost:8080/users/googleLogin', dataToSend);
        
        dispatch(setUserData({ 
          username: res.data.username, 
          useremail: res.data.email 
        }));
        
        console.log('התחברות הצליחה:', res.data);
        navigate('/CalendarComponent', { state: { username: res.data.username, useremail: res.data.email } });
      } catch (error) {
        console.log("error", error.response ? error.response.data : error.message);
      }
    } else {
      console.log("Error: response does not contain profileObj", response);
    }
  };
      return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Fade in timeout={800}>
          <Card sx={{ width: '100%', maxWidth: 450, overflow: 'visible', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)' }}>
              <Zoom in timeout={1000}>
                <Avatar sx={{ width: 60, height: 60, background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)', boxShadow: '0 8px 25px rgba(25,118,210,0.3)' }}>
                  <CalendarToday sx={{ fontSize: 30 }} />
                </Avatar>
              </Zoom>
            </Box>

            <CardContent sx={{ pt: 5, pb: 4, px: 4 }}>
              <Box textAlign="center" mb={4}>
                <Typography variant="h4" component="h1" sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', mb: 1 }}>
                  {isLogin ? 'Welcome Back' : 'Create an Account'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {isLogin ? 'Login to continue to TaskCal' : 'Register to manage your calendar and tasks'}
                </Typography>
              </Box>

              <Box component="form" sx={{ mt: 3 }}>
                {!isLogin && (
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={formData.username}
                    onChange={handleInputChange('username')}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  sx={{ mb: 4 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  sx={{ mb: 2, py: 1.5, background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)', fontSize: '1.1rem' }}
                >
                  {isLogin ? 'LOGIN' : 'SIGN UP'}
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">or</Typography>
                </Divider>

                <GoogleLogin
                  clientId="68610547463-6jlpb2r8l1v581fgkpljthjj5e0r07e6.apps.googleusercontent.com" // הכנס את ה-Client ID שלך כאן
                  render={renderProps => (
                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      startIcon={<Google />}
                      sx={{
                        py: 1.5,
                        borderColor: '#db4437',
                        color: '#db4437',
                        fontSize: '1.1rem',
                        '&:hover': {
                          borderColor: '#db4437',
                          backgroundColor: 'rgba(219, 68, 55, 0.04)',
                        }
                      }}
                    >
                      Continue with Google
                    </Button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />

                <Box mt={3} textAlign="center">
                  <Typography variant="body2">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
                      {isLogin ? 'Sign Up' : 'Login'}
                    </Button>
                  </Typography>
                </Box>

              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    </Container>
  );
};

export default Login;
