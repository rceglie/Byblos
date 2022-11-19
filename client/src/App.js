import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import CreatePost from './components/CreatePost/CreatePost'
import Groups from './components/Groups/Groups'
import About from "./components/About/About";
import MyInfo from "./components/MyInfo/MyInfo";
import EmailVerify from './components/Auth/EmailVerify';
import Auth from './components/Auth/Auth';
import ExpandedGroup from './components/Groups/ExpandedGroup';

const App = () => {
    return (
            <BrowserRouter>
                <Navbar />
                <Routes>
                        <Route path="/" exact element={<Navigate to="/home" />} />
                        <Route path="/home" exact element={<Home />} />
                        <Route path="/signin" exact element={<Auth />}/>
                        <Route path="/create" exact element={<CreatePost />} />
                        <Route path="/groups" exact element={<Groups />} />
                        <Route path="/about" exact element={<About />} />
                        <Route path="/myinfo" exact element={<MyInfo />} />
                        <Route path="/users/:id/verify/:token" element={<EmailVerify/>}/>
                        <Route path="/group/:id" element={<ExpandedGroup/>}/>
                    </Routes> 
            </BrowserRouter>
    )
}

export default App;