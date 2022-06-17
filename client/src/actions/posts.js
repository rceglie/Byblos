import * as api from '../api';

// Action Creators
// export const getPosts = (page) => async (dispatch) => {
//     try {
//       const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
  
//       dispatch({ type: "FETCH_ALL", payload: { data, currentPage, numberOfPages } });
//     } catch (error) {
//       console.log(error);
//     }
//   };

export const getPosts = (filter, navigate) => async (dispatch) => {
    try {
      console.log(filter)
      const { data } = await api.fetchPosts();
      let newArr = data.data
      newArr.push(filter) // Adds filter as last element in data array
      dispatch({ type: "FETCH_ALL", payload: data });
      navigate("/showposts");
    } catch (error) {
      console.log(error);
    }
  };

export const getPost = (id) => async (dispatch) => {
    try {
      const { data } = await api.fetchPost(id);
      dispatch({ type: "FETCH_POST", payload: { post: data } });
    } catch (error) {
      console.log(error);
    }
  };

export const getPostsByUser = (searchQuery, navigate) => async (dispatch) => {
    try{
        const { data: {data} } = await api.fetchPostsByUser(searchQuery);
        dispatch({type: 'FETCH_BY_USER', payload: {data}})
        navigate("/myposts");
    } catch(error){
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try{
        const { data } = await api.createPost(post);
        navigate(`/posts/${data._id}`);
        dispatch({type: 'CREATE', payload: {data}})
    } catch(error){
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try{
        const { data } = await api.updatePost(id, post);

        dispatch({type: 'UPDATE', payload: {data}})
    } catch(error){
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);

        dispatch({type: 'DELETE', payload: id})
    } catch(error){
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.likePost(id);

        dispatch({type: 'UPDATE', payload: {data}})
    } catch(error){
        console.log(error);
    }
}