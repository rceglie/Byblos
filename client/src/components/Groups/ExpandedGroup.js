import React, {useState, useEffect} from 'react';
// import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@mui/material';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import moment from 'moment';
// import { useDispatch } from 'react-redux';
// import {deletePost, likePost} from '../../actions/posts';
import {useNavigate, useParams} from 'react-router-dom'
import "../../style/expandedgroup.css"
import * as api from "../../api";

const ExpandedGroup = ({props}) => {

    let groupid = useParams().id;
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const info = await api.fetchGroup(groupid);
            console.log(info)
            setData(info.data)
        }
        fetchData();
      }, [])

    // use effect for on load : get info for id and display


    return (
        <div>
            <p>{data.fight}</p>
            <p>{data.prog}</p>
            <p>{data.comp}</p>
            <p>{data.exp}</p>
            <p>{data.roles}</p>
            <p>{data.desc}</p>
            <p>{data.createdAt}</p>
            <p>{data.ilvl}</p>
            <p>{data.sum}</p>
            <p>{data.times}</p>
        </div>
        
    );
}

export default ExpandedGroup;