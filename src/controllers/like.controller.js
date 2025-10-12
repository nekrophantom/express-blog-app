import { createLike, findLikes, removeLike } from "../services/like.service.js";

export const getLikes = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.postId)
        if (isNaN(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Post Id",
            });
        }

        const likes = await findLikes({postId})
        
        res.status(200).json({
            success: true,
            data: likes
        })
    } catch (error) {
        next(error);
    }
}

export const likePost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const postId = parseInt(req.params.postId)
        if (isNaN(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Post Id"
            })
        }

        const like = await createLike(userId, postId)
        
        res.status(200).json({
            success: true,
            message: "Liked Post Successfully",
            data: like
        })
    } catch (error) {
        next(error);
    }
}

export const unLikePost = async (req, res, next) => {
    try {
        const userId = req.user.id
        const postId = parseInt(req.params.postId)
        if (isNaN(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Post Id"
            })
        }

        await removeLike({ userId, postId })
        
        res.status(200).json({
            success: true,
            message: "Unliked Post Successfully",
        })
    } catch (error) {
        next(error);
    }
}