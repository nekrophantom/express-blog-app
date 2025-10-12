import { Router } from "express";
import { getUserBy, getUserById, getUsers, removeUser, updateUser } from "../controllers/user.controller.js";

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post("/search", getUserBy)
router.put('/:id', updateUser)
router.delete('/:id', removeUser)

export default router