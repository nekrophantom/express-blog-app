import { connect } from "bun";
import { PrismaClient } from "../../prisma/generated/prisma/index.js";

const prisma = new PrismaClient();

export const findLikes = async (data) => {
    return await prisma.like.findMany({
        where: {
            post_id: data.postId
        }
    })
} 

export const createLike = async (userId, postId) => {
    return await prisma.like.create({
        data: {
            user: {
                connect: {
                    id: userId
                }
            },
            post: {
                connect: {
                    id: postId
                }
            }
        }
    })
}

export const removeLike = async (data) => {
    return await prisma.like.delete({
        where: {
            user_id_post_id: {
                user_id: data.userId,
                post_id: data.postId
            }
        }
    });
};
