import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


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
  CircularProgress,
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  // Google,
  Visibility,
  VisibilityOff,
  CalendarToday,
  CheckCircleOutline,
  ErrorOutline,
} from '@mui/icons-material';

// 
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const usernameValue = watch('username', '');

  const onSubmit = async (data) => {
    setLoading(true);

    if (!isLogin) {
  
      try {
        const response = await axios.post('http://localhost:8080/users/register', data);

        dispatch(
          setUserData({
            username: response.data.username,
            useremail: response.data.email,
            token: response.data.accessToken,
            calendar: response.data.calendar || [],
          })
        );

        navigate('/CalendarComponent', {
          state: {
            username: response.data.username,
            useremail: response.data.email,
          },
        });
        reset();
      } catch (error) {
        alert('Registration failed: ' + (error.response?.data?.message || error.message));
      }
    } else {

      try {
        const response = await axios.post('http://localhost:8080/users/login', {
          email: data.email,
          password: data.password,
        });

        dispatch(
          setUserData({
            username: response.data.username,
            useremail: response.data.useremail,
            token: response.data.accessToken,
            calendar: response.data.calendar,
            userId: response.data.userId,
          })
        );

        navigate('/CalendarComponent', {
          state: {
            username: response.data.username,
            useremail: response.data.useremail,
            token: response.data.accessToken,
            calendar: response.data.calendar,
            userId: response.data.userId,
          },
        });
        reset();
      } catch (error) {
        alert('Login failed: ' + (error.response?.data?.message || error.message));
      }
    }

    setLoading(false);
  };

  const renderValidationIcon = (field) => {
    if (!field) return null;
    if (field?.type) {

      return <ErrorOutline color="error" sx={{ ml: 1 }} />;
    } else {

      return <CheckCircleOutline color="success" sx={{ ml: 1 }} />;
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
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    boxShadow: '0 8px 25px rgba(25,118,210,0.3)',
                  }}
                >
                  <CalendarToday sx={{ fontSize: 30 }} />
                </Avatar>
              </Zoom>
            </Box>

            <CardContent sx={{ pt: 5, pb: 4, px: 4 }}>
              <Box textAlign="center" mb={4}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 1,
                  }}
                >
                  {isLogin ? 'Welcome Back' : 'Create an Account'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {isLogin
                    ? 'Login to continue to TaskCal'
                    : 'Register to manage your calendar and tasks'}
                </Typography>
              </Box>

              <Box
                component="form"
                sx={{ mt: 3 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                {!isLogin && (
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    sx={{ mb: 3 }}
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ''}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {renderValidationIcon(errors.username ? errors.username : !usernameValue ? null : {})}
                        </InputAdornment>
                      ),
                    }}
                    {...register('username', {
                      required: 'Username is required',
                      minLength: { value: 3, message: 'Username must be at least 3 characters' },
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: 'Username should contain only letters and spaces',
                      },
                    })}
                  />
                )}

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  sx={{ mb: 3 }}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {renderValidationIcon(errors.email ? errors.email : {})}
                      </InputAdornment>
                    ),
                  }}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value:
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  sx={{ mb: 4 }}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
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
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 3, message: 'Password must be at least 3 characters' },
                  })}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={!isValid || loading}
                  sx={{
                    mb: 2,
                    py: 1.5,
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    fontSize: '1.1rem',
                    position: 'relative',
                  }}
                >
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: 'white',
                        position: 'absolute',
                        left: 20,
                        top: '50%',
                        marginTop: '-12px',
                      }}
                    />
                  )}
                  {isLogin ? 'LOGIN' : 'SIGN UP'}
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    or
                  </Typography>
                </Divider>

                {/* <GoogleLogin
                  clientId="68610547463-6jlpb2r8l1v581fgkpljthjj5e0r07e6.apps.googleusercontent.com"
                  render={(renderProps) => (
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
                        },
                      }}
                    >
                      Continue with Google
                    </Button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                /> */}

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
