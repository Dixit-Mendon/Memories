import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

//this is going to happen before every below request
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

//with this our backend will be able to get a specific header

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`posts/${id}/likePost`);
export const updatePost = (id, updatePost) => API.patch(`posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);