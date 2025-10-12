import { Router } from "express";
import { addPost, getPostById, getPosts, removePost, updatePost } from "../controllers/post.controller.js";
import { authenticate } from "../middleware/authenticateUser.js";

const router = Router()

router.get('/', getPosts)
router.get('/:id', getPostById)
router.post('/', authenticate, addPost)
router.put('/:id', authenticate, updatePost)
router.delete('/:id', authenticate, removePost)

export default router