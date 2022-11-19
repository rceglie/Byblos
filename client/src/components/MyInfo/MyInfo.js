import React, {useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import Post from '../Groups/Post.js';
import "../../style/myinfo.css"
import {auth} from '../../actions/auth.js'
import { useNavigate } from "react-router-dom";
import * as api from "../../api";

const MyInfo = () => {

  const [info, setInfo] = useState({
    fight: "ANY",
    times: {suns:-1, mons:-1, tues: -1, weds: -1, thurs:-1, fris:-1, sats:-1,sune:-1, mone:-1, tuee: -1, wede: -1, thure:-1, frie:-1, sate:-1},
    prog: "ANY",
    roles: [],
    ilvl: "ANY",
    exp: "ANY"
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await auth(navigate);
      console.log(result)
      if (result){
        const info = await api.fetchInfo(JSON.parse(localStorage.getItem('user'))._id);
        setInfo(info);
      }
      setUser(result);
      setLoading(false);
    }
    fetchData();
  }, [])

  return (
    <div>
      {loading ? <div className="my-info-wrapper"></div> : <>
        {!user ?
          <div className="my-info-wrapper">
            <p>Sign in to update your profile or make a group</p>
            <button onClick={() => navigate("/signin")} className="button-38">Sign In</button>
          </div>
          :
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
                <button>Save info</button>
            </div>
            <div className="my-posts">
                {posts.length > 0 ? posts.map((e) => {
                        return (
                            <Post post={e}/>
                        );
                    })
                    : (
                      <div>
                        <span>"No posts were found for your account"</span>
                        <button>Create Post</button>
                      </div>
                    )}
            </div>
          </div>
        }
        </>
      }
    </div>
  )
}

export default MyInfo