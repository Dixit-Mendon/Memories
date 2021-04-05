import * as api from '../api';

//Action Creators -- Functions that return actions
export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts();
        dispatch({type:'FETCH_ALL', payload:data}); //we are dispatching action which is a object 
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({type:'CREATE',payload:data});
    } catch (error) {
        console.log(error);
    }
}