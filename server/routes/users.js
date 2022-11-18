import express from 'express';
import { signin, signup, verify } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin)
router.post('/signup', signup)
router.get("/:id/verify/:token/", verify)

export default router;