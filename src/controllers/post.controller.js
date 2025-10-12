import { createPost, deletePost, editPost, findPostById, findPosts } from "../services/post.service.js";

export const getPosts = async (req, res, next) => {
    try {
        const posts = await findPosts()
        res.status(200).json({
            success: true,
            message: 'success',
            data: posts
        })
    } catch (error) {
        next(error)
    }
}

export const getPostById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid Post ID" })
        }

        const post = await findPostById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }
        
        res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            data: post
        })
    } catch (error) {
        next(error)
    }
}

export const addPost = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Missing fields" })
        }

        const userId = req.user.id
        const newPost = await createPost({ title, content }, userId)
        
        res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: newPost
        })
    } catch (error) {
        next(error)
    }
}

export const updatePost = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid Post ID" })
        }

        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Missing fields" })
        }

        const user_id = req.user.id
        const updatedPost = await editPost(id, user_id, { title, content, user_id })
        
        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost
        })
    } catch (error) {
        next(error)
    }
}

export const removePost = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid Post ID" })
        }

        await deletePost(id);
        
        res.status(200).jon({
            success: true,
            message: "Post deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}