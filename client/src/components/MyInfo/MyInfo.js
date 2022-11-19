import React, {useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import Post from '../Groups/Post.js';
import "../../style/myinfo.css"
import {auth} from '../../actions/auth.js'
import { useNavigate } from "react-router-dom";
import * as api from "../../api";

const MyInfo = () => {

  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  let posts = [];

  useEffect(() => {
    async function fetchData() {
      console.log("here")
      const result = await auth(navigate);
      console.log(result)
      if (result){
        const info = await api.fetchInfo(JSON.parse(localStorage.getItem('profile')).result._id);
        setInfo(info);
      }
    }
    fetchData();
  }, [])
  

//   if (alldata == undefined) {
//     posts = JSON.parse(localStorage.getItem("posts"))
//   } else {
//     posts = alldata.slice(0, alldata.length)
//     localStorage.setItem('posts', JSON.stringify(posts))
//   }

  return (
    <div className="my-info-wrapper">
        <div className="my-info">
            <span>My Information</span>
            <span>Fight</span>
            <span>Prog</span>
            <span>Jobs</span>
            <span>Times</span>
            <span>Experience</span>
            <span>Item level</span>
            <span>Description</span>
            <button>Searching? Yes/No</button>
        </div>
        <div className="my-posts">
            {posts.length > 0 ? posts.map((e) => {
                    return (
                        <Post post={e}/>
                    );
                }) : "No posts were found for your account"}
        </div>
      
    </div>
  )
}

export default MyInfo