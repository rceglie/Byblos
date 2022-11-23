import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import User from "../models/user.js"
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
    
    try {
        const post = req.body;

        const userId = req.body.creator;
        const groups = await PostMessage.findOne({creator: userId})
        console.log("trying to make new group found", groups)
        if (groups == null){
            const newPost = new PostMessage({...post, creator: post.creator, createdAt: new Date().toISOString()});
            await newPost.save()
            res.status(201).json(newPost)
        } else {
            res.status(500).json({message: "FAILURE"})
        }
    } catch (error){
        res.status(409).json({ message : error.message })
    }
}

export const getGroup = async (req, res) => { 
    const { id } = req.params;

    try {
        console.log(id)
        const post = await PostMessage.findById(id);
        console.log(post)
        res.status(200).json(post);
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

export const getPlayers = async (req, res) => {
    const players = await User.find({"active" : true}, {"_id" : 0, "info" : 1, "discord" : 1, "name" : 1})
    players.forEach((player, index) => {
        console.log(player)
        let temp = {...player.info}
        temp["discord"] = player.discord
        temp["name"] = player.name
        players[index] = temp
    })
    console.log(players)
    res.json(players);
}

export const getUserGroups = async (req, res) => {
    console.log("Getting user groups")
    const userId = req.body.id;
    try {
        const posts = await PostMessage.findOne({creator:userId})
        console.log("  FOUND:", posts)
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const test = async (req, res) => {
    for (let i = 0 ; i < 10; i++){
        let fight = ""
        let times = ""
    }
    console.log("Getting user groups")
    try {
        res.status(200).json("Hello");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}