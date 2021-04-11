import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator:req.userId, createdAt:new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}
// posts/123
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id');

    //simply writing post instead of passing entire object with id also works
    const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    // console.log(updatePost);
    res.json(updatePost);
}

export const deletePost = async (req, res) => {
    const { id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    //req.userId -- This is really really important to mention. If we call a middleware before a specific action like in router.patch('/:id/likePost', auth, likePost) then we can populate the request and then we will have access to that request in the next action (in this case likePost). That is the request will have that property which can be accessed int this controller also
    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        //like the post
        post.likes.push(req.userId);
    } else {
        //dislike the post (i.e. remove the like)
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}