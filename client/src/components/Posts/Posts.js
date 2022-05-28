import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import Post from './Post/Post';

const Posts = ({ setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);
  console.log("In posts component: ")
  console.log(posts)

  let params = posts;

  if (posts.data != null) {
    params = posts.data
  }

  if (!params.length) return 'No posts';

  return (
      <Grid container alignItems="stretch" spacing={3}>
        {params?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
  );
};

export default Posts;