import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    let token;

    // PRIORITAS TOKEN:
    // 1. Authorization Header
    if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    // 2. Cookies (opsional, kalau nanti pakai cookie-parser)
    if (!token && req.cookies?.token) {
        token = req.cookies.token;
    }

    // Kalau token tetap tidak ada → unauthorized
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token missing"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT ERROR:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};