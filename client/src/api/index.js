import axios from 'axios';

// 0 - local
// 1 - server
const backend = 0 // Set to 1 before pushing to github for live deploy

const API = !backend ? axios.create({ baseURL: 'http://localhost:5000'}) : axios.create({ baseURL: 'https://byblos-xiv.herokuapp.com'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

  export const fetchGroup = (id) => API.get(`/posts/${id}`);
  export const fetchPosts = () => API.get(`/posts`);
  export const fetchPostsByUser = (searchQuery) => API.get(`/posts/search/${searchQuery.userId}`);
  export const createPost = (newPost) => API.post('/posts', newPost);
  export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
  export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
  export const deletePost = (id) => API.delete(`/posts/${id}`);

  export const fetchGroups = (filter) => API.post('/posts/getgroups', filter);
  export const fetchInfo = (id) => API.get(`/users/getInfo/${id}`);
  export const setInfo = (info) => API.post(`/users/setInfo`, info);
  export const getPlayers = (filter) => API.post("/posts/getplayers", filter);
  export const setDiscord = (body) => API.post("/users/setDiscord", body);
  export const getUserGroups = (id) => API.post('/posts/getUserGroups', id)
  
  export const signIn = (formData) => API.post('/users/signin', formData);
  export const signUp = (formData) => API.post('/users/signup', formData);

