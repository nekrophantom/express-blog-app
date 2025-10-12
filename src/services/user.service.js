import { PrismaClient } from "../../prisma/generated/prisma/index.js"

const prisma = new PrismaClient();

const userSelect = {
  id: true,
  name: true,
  email: true,
  created_at: true,
  updated_at: true,
};

export const findUsers = async () => {
    return await prisma.user.findMany({
        select: userSelect
    })
}

export const findUserById = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id: id
        },
        select: userSelect
    })
}

export const findUserBy = async (where) => {
    return await prisma.user.findUnique({
        where,
    })
}

export const createUser = async (data) => {
    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    })
}

export const editUser = async (id, data) => {
    return await prisma.user.update({
        where: {
            id: id
        },
        data: data,
        select: userSelect
    })
}

export const deleteUser = async (id) => {
    return await prisma.user.delete({
        where: {
            id: id
        }
    })
}