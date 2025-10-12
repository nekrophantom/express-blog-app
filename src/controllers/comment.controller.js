import { createComment, deleteComment, editComment, findComments } from "../services/comment.service.js";

export const getComments = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.postId);
        if (isNaN(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Post Id"
            })
        }

        const comments = await findComments({postId})

        res.status(200).json({
            success: true,
            message: "Fetched Comments Successfully",
            data: comments
        })
    } catch (error) {
        next(error);
    }
}

export const addComment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = parseInt(req.params.postId);
        if (isNaN(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Post Id"
            })
        }

        const { content } = req.body
        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            })
        }

        const comment = await createComment({ content }, postId, userId)

        res.status(200).json({
            success: true,
            message: "Create Comment Successfully",
            data: comment
        })
    } catch (error) {
        next(error);
    }
}

export const updateComment = async (req, res, next) => {
    try {
        const commentId = parseInt(req.params.commentId)
        const userId = req.user.id
        const { content } = req.body
        if (isNaN(commentId)) {
            res.status(400).json({
                success: false,
                message: "Invalid Comment Id"
            })
        }

        if (!content) {
            res.status(400).json({
                success: false,
                message: "Content is required"
            })
        }

        const updatedComment = await editComment(commentId, userId, { content })

        res.status(200).json({
            success: true,
            message: "Update Comment Successfully",
            data: updatedComment
        })
    } catch (error) {
        next(error)
    }
}

export const removeComment = async (req, res, next) => {
    try {
        const commentId = parseInt(req.params.commentId)
        const userId = req.user.id

        if (isNaN(commentId)) {
            res.status(400).json({
                success: false,
                message: "Invalid Comment Id"
            })
        }

        await deleteComment(commentId, userId)

        res.status(200).json({
            success: true,
            message: "Delete Comment Successfully"
        })
    } catch (error) {
        next(error)
    }
}