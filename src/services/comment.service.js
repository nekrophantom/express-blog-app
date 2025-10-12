import { connect } from "bun";
import { PrismaClient } from "../../prisma/generated/prisma/index.js";

const prisma = new PrismaClient();

export const findComments = async (data) => {
    return await prisma.comment.findMany({
        where: {
            post_id: data.postId
        }
    })
}

export const createComment = async (data, postId, userId) => {
    return await prisma.comment.create({
        data: {
            content: data.content,
            post: {
                connect: {
                    id: postId
                }
            },
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })
}

export const editComment = async (id, user_id, data) => {
    return await prisma.comment.update({
        where: {
            id: id,
            user_id: user_id
        },
        data: {
            content: data.content
        }
    })
}

export const deleteComment = async (id, user_id) => {
    return await prisma.comment.delete({
        where: {
            id: id,
            user_id: user_id
        }
    })
}