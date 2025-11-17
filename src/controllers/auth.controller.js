import { getUserFromToken, loginUser, registerUser } from "../services/auth.service.js"

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

// export const login = async (req, res, next) => {
//     try {
//         const { email, password } = req.body
//         const loggedinUser = await loginUser({ email, password })

//         res.status(200).json({
//             success: true,
//             message: 'success',
//             data: loggedinUser
//         })
//     } catch (error) {
//         next(error)
//     }
// }


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const loggedinUser = await loginUser({ email, password });

        // SET TOKEN AS HTTP-ONLY COOKIE
        res.cookie("token", loggedinUser.token, {
            httpOnly: true,
            secure: false, // ganti true kalau sudah https
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            success: true,
            message: "Login success",
            data: loggedinUser.user
        });
    } catch (error) {
        next(error);
    }
};

export const me = async (req, res) => {
    try {
        const token = req.cookies?.token;

        const safeUser = await getUserFromToken(token);

        return res.json({
            success: true,
            user: safeUser,
        });
    } catch (err) {
        if (err.message === "NOT_AUTHENTICATED") {
            return res.status(401).json({ message: "Not authenticated" });
        }

        if (err.message === "TOKEN_INVALID") {
            return res.status(401).json({ message: "Token invalid" });
        }

        if (err.message === "USER_NOT_FOUND") {
            return res.status(401).json({ message: "User not found" });
        }

        return res.status(500).json({ message: "Server error" });
    }
};