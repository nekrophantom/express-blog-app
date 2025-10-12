import { PrismaClient } from "../../prisma/generated/prisma/index.js";

const prisma = new PrismaClient();

export const findPosts = async () => {
    return await prisma.post.findMany()
}

export const findPostById = async (id) => {
    return await prisma.post.findUnique({
        where: {
            id: id
        }
    })
}

export const createPost = async (data, userId) => {
    return await prisma.post.create({
        data: {
            title: data.title,
            content: data.title,
            user:{
                connect: {
                    id: userId
                }
            }
        }
    })
}

export const editPost = async (id, user_id, data) => {
    return await prisma.post.update({
        where: {
            id: id,
            user_id: user_id,
        },
        data: data
    })
}

export const deletePost = async (id) => {
    return await prisma.post.delete({
        where: {
            id: id
        }
    })
}