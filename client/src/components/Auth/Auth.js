import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input';
import {useState} from 'react';
import { signin, signup } from '../../actions/auth';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSumbit = (e) => {
    e.preventDefault();
    if (!/[A-Z]/.test(formData.password) || !/\d/.test(formData.password)){
      alert("Password must contain at least one uppercase letter and at least one number.")
      return 0;
    }
    if (isSignup){
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }

  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <Avatar>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
        <form onSubmit={handleSumbit}>
          <Grid container spacing={2}>
            { isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autofocus/>
                  <Input name="lastName" label="Last Name" handleChange={handleChange} autofocus/>
                </>
              )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type="password"/>
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
          </Grid>
          <Button type="sumbit" fullWidth variant="contained" color="primary">
            { isSignup ? 'Sign Up' : "Sign in"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth