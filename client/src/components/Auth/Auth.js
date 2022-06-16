import React from 'react'
import { useState } from 'react';
import { signin, signup } from '../../actions/auth';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let formData = { email: '', password: '', firstName: '', lastName: ''};
  
  const handleSumbit = (e) => {
    e.preventDefault();
    formData.firstName = document.getElementById("firstname").value;
    formData.lastName = document.getElementById("lastname").value;
    formData.email = document.getElementById("email").value;
    formData.password = document.getElementById("password").value;
    
    if (formData.password != document.getElementById("confirmpassword").value){
      alert("assword and Confirm Password must match.")
      return 0;
    }

    console.log(formData)

    if (!/[A-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
      alert("Password must contain at least one uppercase letter and at least one number.")
      return 0;
    }
    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }

  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  return (
    <div>
      <p>{isSignup ? "Sign up" : "Sign in"}</p>
      <form onSubmit={handleSumbit}>
        {isSignup && (
          <>
            <input id="firstname" name="firstName" label="First Name" autofocus />
            <input id="lastname" name="lastName" label="Last Name" autofocus />
          </>
        )}
        <input id="email" name="email" label="Email Address" type="email" />
        <input id="password" name="password" label="Password" type="password" />
        {isSignup && <input id="confirmpassword" name="confirmPassword" label="Repeat Password" type="password" />}
        <button type="sumbit" fullWidth variant="contained" color="primary">
          {isSignup ? 'Sign Up' : "Sign in"}
        </button>
        <button type="button" onClick={switchMode}>
          {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  )
}

export default Auth