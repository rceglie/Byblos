import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import { filterPosts } from '../utils/filterPosts.js';

export const getGroups = async (req, res) => {
    const filter = req.body;

    try{
        const posts = await PostMessage.find();
        const filteredPosts = filterPosts(posts, filter);
        res.status(200).json({data: filteredPosts});
    } catch (error){
        console.log(error)
        res.status(404).json({message : error.message});
    }
}

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

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsByUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const posts = await PostMessage.find({creator:userId})
        console.log("FOUND: " + posts)
        res.status(200).json({data: posts});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    const updatedPost = await PostMessage.findByIdAndRemove(id);

    res.json({message:"Post deleted successfully"});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, { new: true});

    res.json(updatedPost);
}