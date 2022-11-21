import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar, Divider } from "@mui/material";
import logo from '../../images/logo2.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPostsByUser } from '../../actions/posts';
import "../../style/navbar.css"
import {auth} from '../../actions/auth.js'

const Navbar = () => {

  //const tempuser = localStorage.getItem('user');
  //console.log(tempuser.displayName)
  const [user, setUser] = useState({displayName:""})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      const result = await auth();
      console.log("Signed in:", result)
      if (result){
        setUser(JSON.parse(localStorage.getItem('user')))
        const col = Math.floor(Math.random()*16777215).toString(16);
        document.getElementById("avatar").style.background = "#" + col;
      } else {
        setUser(null);
      }
    }
    fetchData();
  }, [])

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate("/")
    setUser(null)
  }

    const clickHome = () => {
      navigate("/home")
    }

  const mouseout = () => {
    document.getElementById("logout-btn").style.display="none";
    document.getElementById("avatar").style.display="block";
    document.getElementById("name").style.display="block";
  }

  const mouseover = () => {
    document.getElementById("logout-btn").style.display="block";
    document.getElementById("avatar").style.display="none";
    document.getElementById("name").style.display="none";
  }

  return (
    <div className="container">
      <div className="title-pic"> 
        <img className="logo" onClick={clickHome} src={logo} alt="icon" height="60" />
        <h1 className="title" onClick={clickHome}>Byblos</h1>
      </div>
      <div className="right-side">
        <button className="button-37" onClick={() => navigate("/groups")}>Browse Groups</button>
        <button className="button-37" onClick={() => navigate("/players")}>Browse Players</button>
        <button className="button-37" onClick={() => navigate("/myinfo")}>My Information</button>
        {user ? (
          <div className="userstuff" onMouseOver={mouseover} onMouseOut={mouseout}>
            <div className="circle" id="avatar" display="block">
              {
                (user.displayName.indexOf(' ') >= 0) ?
                  (user.displayName.charAt(0) + user.displayName.charAt(user.displayName.indexOf(' ')+1)).toUpperCase()
                  :
                  (user.displayName.charAt(0) + user.displayName.charAt(1)).toUpperCase()
              }
            </div>
            <p id="name" display="block">{user.displayName}</p>
            <button className="button-37" hidden onClick={logout} id="logout-btn">Logout</button>
          </div>
        ) : (
          <button onClick={() => navigate("/signin")} className="button-37">Sign In</button>
        )}
      </div>
    </div>
  )
}

export default Navbar;