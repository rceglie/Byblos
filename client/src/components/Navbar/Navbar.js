import React, { useEffect, useState }  from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar, Divider } from "@mui/material";
import soxpicture from '../../images/sox.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

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

    return(
        <AppBar position="static" color="inherit">
      <div>
        <Typography component={Link} to="/" variant="h2" align="center">Byblos</Typography>
        <h2>The Final Fantasy XIV Static Finder</h2>
        <img src={soxpicture} alt="icon" height="60" />
      </div>
      <Toolbar>
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
    </AppBar>
    )
    }

export default Navbar;