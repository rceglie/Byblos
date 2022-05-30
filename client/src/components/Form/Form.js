import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Radio, FormControlLabel, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';
import RoleSelect from './RoleSelect';
import "../../style/form.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import {getImage} from "./getImage.js";

const Form = ( {currentId, setCurrentId}) => {

    const [postData, setPostData] = useState({
        fight: '', times: '', prog: '', roles: [], comp: '', ilvl: "", logs: "", exp: "", desc: ""
    });
    const dispatch = useDispatch();
    const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate();

    useEffect(()=>{
        if (post) setPostData(post)
    },[post]);

    useEffect(()=>{
        console.log("Post data: ")
        console.log(postData)
    });

    const handleSumbit = (e) => {
        console.log("scrap")
        e.preventDefault();

        if(currentId == 0) {
            dispatch(createPost({...postData, name: user?.result?.name, creator: user?.result?._id}, navigate))
        } else {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        }
        clear();   
    }

    const handleCallback = (childData) => {
        console.log("hi")
        let newArr = postData.roles
        newArr.push(childData);
        console.log(newArr)
        setPostData(prevState => ({...prevState, roles: newArr}))
    }

    if(!user?.result?.name) {
        return (
            <Paper>
                <Typography variant="h6" align="center">
                    Sign in to create a LFM post
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(0);
        setPostData({fight: postData.fight, times: '', prog: '', roles: [], comp: '', ilvl: "", logs: "", exp: "", desc: ""})
    }

    const editSlot = () => {
        console.log("edit clicked")
    }

    const deleteSlot = () => {

    }

    return (
        <div className="create-LFM border">
            <form autoComplete="off" onSubmit={handleSumbit}>
                <h3 className="lfm-title"> {currentId ? "Editing a Post" : "Create a Post"}</h3>
                <div className="fights">
                    <div className="radio">
                        <input type="radio" value="UWU" id="uwusel" name="fight" onChange={(e) => setPostData({ ... postData, fight: e.target.value })}/>
                        <label className="radiobtn" for="uwusel">UWU</label>
                    </div>
                    <div className="radio">
                        <input type="radio" value="UCOB" name="fight" onChange={(e) => setPostData({ ... postData, fight: e.target.value })}/>
                        <label className="radiobtn" for="ucobsel">UCOB</label>
                    </div>
                    <div className="radio">
                        <input type="radio" value="UWU" name="fight" onChange={(e) => setPostData({ ... postData, fight: e.target.value })}/>
                        <label className="radiobtn" for="teasel">TEA</label>
                    </div>
                    <div className="radio">
                        <input type="radio" value="DSU" name="fight" onChange={(e) => setPostData({ ... postData, fight: e.target.value })}/>
                        <label className="radiobtn" for="dsusel">DSU</label>
                    </div>
                </div>
                <TextField
                    name="times"
                    required
                    variant="outlined"
                    label="Times"
                    fullWidth
                    value={postData.times}
                    onChange={(e) => setPostData({ ... postData, times: e.target.value })}/>
                <TextField
                    name="prog"
                    required
                    variant="outlined"
                    label="Prog"
                    fullWidth
                    value={postData.prog}
                    onChange={(e) => setPostData({ ... postData, prog: e.target.value })}/>
                <div>
                    <h3>Roles Needed:</h3>
                    {postData.roles.map((mem) => (
                        <div className="slot">
                            <div className="slot-header">
                                <p>Slot {postData.roles.indexOf(mem)+1}</p>
                                <div className="slot-buttons">
                                    <Button onClick={editSlot}>
                                        <EditIcon />
                                    </Button>
                                    <Button onClick={deleteSlot}>
                                        <DeleteIcon />
                                    </Button>
                                </div>
                            </div>
                            <div className="slot-content">
                                {
                                    mem.map((job) => {
                                        return (
                                            <div className="singleRole">
                                                <img className="roleImage" src={getImage(job)}/>
                                                {
                                                    (mem.indexOf(job) != mem.length-1) ? <h1>/</h1> : <p></p>
                                                }
                                            </div>
                                        )
                                                
                                    })
                                }
                            </div>
                        </div>
                    ))}
                    <RoleSelect parentCallback={handleCallback}/>
                </div>
                <TextField
                    name="comp"
                    variant="outlined"
                    label="Comp"
                    fullWidth
                    value={postData.comp}
                    onChange={(e) => setPostData({ ... postData, comp: e.target.value })}/>
                <TextField
                    name="ilvl"
                    variant="outlined"
                    label="ilvl"
                    fullWidth
                    value={postData.ilvl}
                    onChange={(e) => setPostData({ ... postData, ilvl: e.target.value })}/>
                <TextField
                    name="logs"
                    variant="outlined"
                    label="Logs"
                    fullWidth
                    value={postData.logs}
                    onChange={(e) => setPostData({ ... postData, logs: e.target.value })}/>
                <TextField
                    name="exp"
                    variant="outlined"
                    label="Exp"
                    fullWidth
                    value={postData.exp}
                    onChange={(e) => setPostData({ ... postData, exp: e.target.value })}/>
                <TextField
                    name="desc"
                    variant="outlined"
                    label="Desc"
                    fullWidth
                    value={postData.desc}
                    onChange={(e) => setPostData({ ... postData, desc: e.target.value })}/>
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </div>
    );
}

export default Form;