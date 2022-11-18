import React, { useEffect, useState }  from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar, Divider } from "@mui/material";
import logo from '../../images/logo2.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import "../../style/navbar.css"
import Menu from "./Menu.js"

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
      const token = user?.token;
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
      dispatch({type: 'LOGOUT'});
      navigate("/")
      setUser(null)
    }

    const clickHome = () => {
      navigate("/home")
    }

  return(
    <div className="container">
      <div className="title-pic"> 
        <img className="logo" onClick={clickHome} src={logo} alt="icon" height="60" />
        <h1 className="title" onClick={clickHome}>Byblos</h1>
      </div>
      <div className="right-side">
        <button className="button-37" onClick={() => navigate("/groups")}>Browse Groups</button>
        <button className="button-37" onClick={() => navigate("/groups")}>Browse Players</button>
        <button className="button-37" onClick={() => navigate("/about")}>My Information</button>
        {user ? (
          <div className="userstuff">
            <Avatar>{user?.result.name.charAt(0)}</Avatar>
            <Typography variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className="button-37" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <button onClick={() => navigate("/auth")} className="button-37">Sign In</button>
        )}
      </div>
    </div>
  )
}

export default Navbar;