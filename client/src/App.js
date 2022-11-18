import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import PostDetails from './components/PostDetails/PostDetails';
import CreatePost from './components/CreatePost/CreatePost'
import Groups from './components/Groups/Groups'
import TestGroups from './components/Groups/TestGroups'
import ShowPosts from './components/ShowPosts/ShowPosts'
import AllPosts from './components/AllPosts/AllPosts';
import About from "./components/About/About";
import MyPosts from "./components/MyPosts/MyPosts";
import EmailVerify from './components/EmailVerify/EmailVerify';

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
                <Route path="/groups" exact element={<Navigate to="/testgroups"/>} />
                <Route path="/testgroups" exact element={<TestGroups />} />
                <Route path="/showposts" exact element={<ShowPosts />} />
                <Route path="/about" exact element={<About />} />
                <Route path="/myposts" exact element={<MyPosts />} />
                <Route path="/users/:id/verify/:token" element={<EmailVerify/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;