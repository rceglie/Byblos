import express from 'express';
import { signin, signup, verify, getInfo } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin)
router.post('/signup', signup)
router.get("/:id/verify/:token/", verify)
router.get("/getInfo/:id", getInfo);

export default router;