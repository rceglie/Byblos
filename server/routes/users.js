import express from 'express';
import { signin, signup, verify, getInfo, setInfo, setDiscord } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin)
router.post('/signup', signup)
router.get("/:id/verify/:token/", verify)
router.get("/getInfo/:id", getInfo);
router.post('/setInfo', setInfo);
router.post('/setDiscord', setDiscord)

export default router;