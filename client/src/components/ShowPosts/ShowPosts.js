import React, {useState} from 'react';
import { Experimental_CssVarsProvider, Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import "../../style/showposts.css";
import { getJustPosts } from "../../actions/posts";
import { filterPosts } from "./filterPosts"

import Post from './Post';


const ShowPosts = () => {
  const dispatch = useDispatch();

  let alldata = useSelector(state => state.posts).posts.data;

  let posts;
  let filter;

  if (alldata == undefined){
    posts = JSON.parse(localStorage.getItem("posts"))
    filter = JSON.parse(localStorage.getItem("filter"))
  } else {
    posts = alldata.slice(0, alldata.length-1)
    filter = alldata.slice(alldata.length-1,alldata.length)[0]
    localStorage.setItem('posts', JSON.stringify(posts))
    localStorage.setItem('filter', JSON.stringify(filter))
    alldata = {stuff:"cool"}
  }

  const filteredPosts = filterPosts(posts, filter);

  if (filteredPosts.length == 0) return "No posts"

  return (
    <div className="posts-wrapper">
      {filteredPosts?.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default ShowPosts;