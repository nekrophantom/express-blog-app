import { Router } from "express";
import userRoutes from './user.route.js'
import authRoutes from './auth.route.js'
import postRoutes from './post.route.js'
import likeRoutes from './like.route.js'
import commentRoutes from './comment.route.js'

const router = Router()

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/posts', postRoutes)
router.use('/posts', likeRoutes)
router.use('/posts', commentRoutes)

export default router