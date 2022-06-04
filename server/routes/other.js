import express from 'express';

import { createPost } from '../controllers/other.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.post('/create', auth, createPost);

export default router;