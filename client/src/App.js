import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import CreatePost from './components/CreatePost/CreatePost'

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'))
    const temp = !user ? <Auth /> : <Navigate to="/posts" />

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Navigate to="/posts" />} />
                <Route path="/posts" exact element={<Home />}/>
                <Route path="/posts/search" exact element={<Home />}/>
                <Route path="/posts/:id" exact element={<PostDetails />} />
                <Route path="/auth" exact element={temp} />
                <Route path="/create" exact element={<CreatePost />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;