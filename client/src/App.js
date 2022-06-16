import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import CreatePost from './components/CreatePost/CreatePost'
import LFG from './components/LFG/LFG'
import ShowPosts from './components/DisplayPosts/ShowPosts'
import About from "./components/About/About";
import MyPosts from "./components/MyPosts/MyPosts";
import EmailVerify from './components/EmailVerify/EmailVerify';

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'))
    const temp = !user ? <Auth /> : <Navigate to="/posts" />

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Navigate to="/home" />} />
                <Route path="/home" exact element={<Home />} />
                <Route path="/posts" exact element={<Home />}/>
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/auth" exact element={temp} />
                <Route path="/create" exact element={<CreatePost />} />
                <Route path="/lfg" exact element={<LFG />} />
                <Route path="/showposts" exact element={<ShowPosts />} />
                <Route path="/about" exact element={<About />} />
                <Route path="/myposts" exact element={<MyPosts />} />
                <Route path="/users/:id/verify/:token" element={<EmailVerify/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;