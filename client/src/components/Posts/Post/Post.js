import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts';

const Post = ({post, setCurrentId}) => {
    const dispatch = useDispatch();

    return (
        <Card>
            <CardMedia image={post.selectedFile} title={post.title}/>
            <div>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div>
                <Button style={{color:'black'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default"/>
                </Button>
            </div>
            <div>
                <Typography variant="body2" color="textSecondary">{post.tags}</Typography>
            </div>
            <div>
                <Typography variant="body2" color="textSecondary">{post.title}</Typography>
            </div>
            <CardContent>
                <Typography variant="h5" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
                    &nbsp; Likes &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;