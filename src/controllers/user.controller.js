import { createUser, deleteUser, findUserBy, findUserById, findUsers } from "../services/user.service.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await findUsers()
        res.status(200).json({
            success: true,
            message: 'success',
            data: users
        })
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
          return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const user = await findUserById(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        next(error)
    }
}

export const getUserBy = async (req, res, next) => {
    try {
        const  { email, name } = req.body
        if (!email && !name) {
            return res.status(400).json({
                success: false,
                message: "Please provide a search parameter (email or name)",
            });
        }

        const where = {};
        if (email) where.email = email;
        if (name) where.name = name;

        const user = await findUserBy(where);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        next(error)
    }
}

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        if (!email || !name  || !password) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        const newUser = await createUser({ name, email, password })
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser,
        });
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
          return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const { name, email } = req.body;
        if (!name && !email) {
            return res.status(400).json({ success: false, message: "No valid fields provided" });
        }

        const updatedUser = await editUser(id, { name, email });

        // const newUser = await createUser({ name, email, password })
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: updatedUser,
        });
    } catch (error) {
        next(error)
    }
}

export const removeUser = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
          return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        await deleteUser(id)
        
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error)
    }
}