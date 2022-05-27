import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import "./style.css";

const Form = ( {currentId, setCurrentId}) => {

    const [postData, setPostData] = useState({
        fight: '', times: '', prog: '', roles: '', comp: '', ilvl: "", logs: "", exp: "", desc: ""
    });
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id == currentId) : null);
    useEffect(()=>{
        if (post) setPostData(post)
    },[post]);

    const handleSumbit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();   
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({fight: '', times: '', prog: '', roles: '', comp: '', ilvl: "", logs: "", exp: "", desc: ""})
    }

    return (
        <div class="create-LFM">
            <form autoComplete="off" onSubmit={handleSumbit}>
                <Typography variant="h6">{currentId ? "Editing a Memory" : "Create a Looking for Member (LFM) Post"}</Typography>
                <RadioGroup row name="fight">
                    <FormControlLabel value="UWU" control={<Radio required={true}/>} label="UWU" onChange={(e) => setPostData({ ... postData, fight: e.target.value })}/>
                    <FormControlLabel value="UCOB" control={<Radio required={true}/>} label="UCOB" onChange={(e) => setPostData({ ... postData, fight: e.target.value })}/>
                    <FormControlLabel value="TEA" control={<Radio required={true}/>} label="TEA" onChange={(e) => setPostData({ ... postData, fight: e.target.value })}/>
                    <FormControlLabel value="DSU" control={<Radio required={true}/>} label="DSU" onChange={(e) => setPostData({ ... postData, fight: e.target.value })}/>
                </RadioGroup>
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
                <TextField
                    name="roles"
                    required
                    variant="outlined"
                    label="Roles"
                    fullWidth
                    value={postData.roles}
                    onChange={(e) => setPostData({ ... postData, roles: e.target.value })}/>
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