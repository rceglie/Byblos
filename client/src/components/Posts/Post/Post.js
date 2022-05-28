import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts';
import {useNavigate} from 'react-router-dom'

const Post = ({post, setCurrentId}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate();

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    }

    return (
        <Card>
            <ButtonBase
                component="span"
                name="test"
                onClick={openPost}
            >
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
                    <Typography variant="body2">Posted by: {post.name}</Typography>
                    <Typography variant="body2">Created {moment(post.createdAt).fromNow()}</Typography>
                </div>
            </ButtonBase>
            <CardActions>
                <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
                    &nbsp; Likes &nbsp;
                    {post.likeCount}
                </Button>
                {(user?.result?._id == post?.creator) && (
                    <div>
                        <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                            Delete
                        </Button>
                        <Button style={{color:'black'}} size="small" onClick={() => setCurrentId(post._id)}>
                            <MoreHorizIcon fontSize="large"/>
                        </Button>
                    </div>   
                )}
            </CardActions>
        </Card>
    );
}

export default Post;