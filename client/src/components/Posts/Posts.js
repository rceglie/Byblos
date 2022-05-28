import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import Post from './Post/Post';

const Posts = ({ setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);

  if (!posts.length) return 'No posts';

  return (
      <Grid container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
  );
};

export default Posts;