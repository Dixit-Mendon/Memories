import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post.js';
import useStyles from './styles';

const Posts = () => {
    const posts = useSelector((state) => state.posts);  //we written posts from the global store and also state has access to all global redux store or state
    const classes = useStyles();

    console.log(posts);
    return (
        <>
            <h1>POSTS</h1>
            <Post />
            <Post />
        </>
    );
}

export default Posts;