import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import PostDetails from './components/PostDetails/PostDetails';
import CreatePost from './components/CreatePost/CreatePost'
import LFG from './components/LFG/LFG'
import ShowPosts from './components/DisplayPosts/ShowPosts'
import About from "./components/About/About";
import MyPosts from "./components/MyPosts/MyPosts";
import EmailVerify from './components/EmailVerify/EmailVerify';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Navigate to="/home" />} />
                <Route path="/home" exact element={<Home />} />
                <Route path="/posts" exact element={<Home />}/>
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/create" exact element={<CreatePost />} />
                <Route path="/lfg" exact element={<LFG />} />
                <Route path="/showposts" exact element={<ShowPosts />} />
                <Route path="/about" exact element={<About />} />
                <Route path="/myposts" exact element={<MyPosts />} />
                <Route path="/users/:id/verify/:token" element={<EmailVerify/>}/>
                <Route path="/signin" exact element={<Signin/>}/>
                <Route path="/signup" exact element={<Signup/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;