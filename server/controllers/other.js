import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const createPost = async (req, res) => {
    
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try{
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error){
        res.status(409).json({ message : error.message })
    }
}

/*
export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    const updatedPost = await PostMessage.findByIdAndRemove(id);

    res.json({message:"Post deleted successfully"});
}
*/
