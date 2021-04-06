import React from 'react';
import {Grid, CircularProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';

// eslint-disable-next-line no-unused-vars
import Post from './Post/Post.js';
import useStyles from './styles';

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);  //we written posts from the global store and also state has access to all global redux store or state
    const classes = useStyles();

    console.log(posts);
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts;