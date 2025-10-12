import { Router } from "express";
import { addComment, getComments, removeComment, updateComment } from "../controllers/comment.controller.js";
import { authenticate } from "../middleware/authenticateUser.js";

const router = Router()

router.get('/:postId/comments', getComments)
router.post('/:postId/comment', authenticate, addComment)
router.put('/comments/:commentId', authenticate, updateComment)
router.delete('/comments/:commentId', authenticate, removeComment)

export default router