import React, { useEffect, useState }  from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar, Divider } from "@mui/material";
import soxpicture from '../../images/sox.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import "../../style/navbar.css"

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
      navigate("/")
    }

  return(
    <div className="container">
      <div className="left-side">
        <div className="site-info">
          <img className="logo" onClick={clickHome} src={soxpicture} alt="icon" height="60" />
          <h1 className="title" onClick={clickHome}>Byblos</h1>
          <h2>The Final Fantasy XIV Static Finder</h2>
        </div>
        <div className="navigation-btns">
          <button>Create Post (you must be logged in to create a post)</button>
          <button>Search Posts neither of these do anything yet</button>
        </div>
      </div>
      <Toolbar className="toolbar">
        {user ? (
          <div>
            <Avatar>{user?.result.name.charAt(0)}</Avatar>
            <Typography variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </div>
  )
}

export default Navbar;