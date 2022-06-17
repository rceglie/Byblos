import React from 'react'
import { useSelector } from "react-redux";
import Post from '../DisplayPosts/Post';

const MyPosts = () => {

  let alldata = useSelector(state => state.posts).posts.data;
  let posts;

  if (alldata == undefined) {
    posts = JSON.parse(localStorage.getItem("posts"))
  } else {
    posts = alldata.slice(0, alldata.length)
    localStorage.setItem('posts', JSON.stringify(posts))
  }

  return (
    <div>
      {posts.length > 0 ? posts.map((e) => {
        return (
            <Post post={e}/>
        );
      }) : "No posts were found for your account"}
    </div>
  )
}

export default MyPosts