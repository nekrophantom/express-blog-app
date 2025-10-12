    import { Router } from "express";
import { getLikes, likePost, unLikePost } from "../controllers/like.controller.js";
import { authenticate } from "../middleware/authenticateUser.js";

const router = Router();

router.get('/:postId/likes', authenticate, getLikes)
router.post('/:postId/like', authenticate, likePost)
router.delete('/:postId/unlike', authenticate, unLikePost)

export default router;