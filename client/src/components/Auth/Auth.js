import React, { useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input';
import {useState} from 'react';
import { signin, signup } from '../../actions/auth';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import '../../style/auth.css';
import * as api from "../../api";

const initialState = {displayName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const navigate = useNavigate();

  useEffect(() => {
    console.log(formData)
    console.log(isSignup)
  })

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!/[A-Z]/.test(formData.password) || !/\d/.test(formData.password)){
      alert("Password must contain at least one uppercase letter and at least one number.")
      //return 0;
    } else {
      console.log("clicked")
      if (isSignup){
        console.log("pre call")
        const {data} = await api.signUp(formData)
        console.log(data);
        if (data.message == "SUCCESS"){
          const _id = data._id;
          const displayName = data.displayName;
          localStorage.setItem('user', JSON.stringify({_id, displayName}));
          localStorage.setItem('token', JSON.stringify(data.token));
          navigate("/home");
          window.location.reload(false);
        } else {
          console.log(data.result)
        }
      } else { // Signing in
        const {data} = await api.signIn(formData)
        console.log(data.message)
        if (data.message == "SUCCESS"){
          const _id = data._id;
          const displayName = data.displayName;
          localStorage.setItem('user', JSON.stringify({_id, displayName}));
          localStorage.setItem('token', JSON.stringify(data.token));
          navigate("/home");
          window.location.reload(false);
        } else {
          console.log(data.result)
        }
      }
    }

  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  return (
    <Container component="main" maxWidth="xs" className="auth-wrapper">
      <Paper>
        <Avatar>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
        <form onSubmit={handleSumbit}>
          <Grid container spacing={2}>
            { isSignup && (
                <>
                  <Input name="displayName" label="Name" handleChange={handleChange} autofocus/>
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