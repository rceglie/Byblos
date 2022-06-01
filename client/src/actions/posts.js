import * as api from '../api';

// Action Creators
export const getPosts = (page) => async (dispatch) => {
    try {
      const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
  
      dispatch({ type: "FETCH_ALL", payload: { data, currentPage, numberOfPages } });
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

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{
        console.log("SEARCHING FOR:")
        console.log(searchQuery)
        const { data: {data} } = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: 'FETCH_BY_SEARCH', payload: {data}})
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