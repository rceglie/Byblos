import express from 'express';

import { getGroups, getGroup, createPost, updatePost, likePost, deletePost, getPlayers, getUserGroups } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.post('/getgroups', getGroups); // rename to /posts/searchgroups
router.post('/',auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.get('/:id', getGroup)
router.post('/getplayers', getPlayers)
router.post('/getUserGroups', getUserGroups)

export default router;