import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts';

const Post = ({post, setCurrentId}) => {
    const dispatch = useDispatch();
    //console.log(post)

    return (
        <Card>
            <CardMedia title={post.title}/>
            <div>
                <Typography variant="h6">LFM Post</Typography>
                <Typography variant="body2">Fight: {post.fight}</Typography>
                <Typography variant="body2">Times: {post.times}</Typography>
                <Typography variant="body2">Prog:  {post.prog}</Typography>
                <Typography variant="body2">Roles: {post.roles}</Typography>
                <Typography variant="body2">Comp:  {post.comp}</Typography>
                <Typography variant="body2">ilvl:  {post.ilvl}</Typography>
                <Typography variant="body2">Logs:  {post.logs}</Typography>
                <Typography variant="body2">Exp:   {post.exp}</Typography>
                <Typography variant="body2">Desc:  {post.desc}</Typography>
                <Typography variant="body2">Created {moment(post.createdAt).fromNow()}</Typography>
            </div>
            <CardActions>
                <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
                    &nbsp; Likes &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                    Delete
                </Button>
                <Button style={{color:'black'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="large"/>
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;