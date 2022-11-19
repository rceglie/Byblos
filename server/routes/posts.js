import express from 'express';

import { getPostsByUser, getGroups, getGroup, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search/:id', getPostsByUser); // probably rename to /searchgroups/
router.post('/getgroups', getGroups); // rename to /posts/searchgroups
router.post('/',auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.get('/:id', getGroup)

export default router;