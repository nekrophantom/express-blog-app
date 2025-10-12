import { loginUser, registerUser } from "../services/auth.service.js"

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const newUser = await registerUser({ name, email, password })

        res.status(201).json({
            success: true,
            message: 'success',
            data: newUser
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const loggedinUser = await loginUser({ email, password })

        res.status(200).json({
            success: true,
            message: 'success',
            data: loggedinUser
        })
    } catch (error) {
        next(error)
    }
}