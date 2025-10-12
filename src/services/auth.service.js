import bcrypt from 'bcrypt'
import { createUser, findUserBy } from "./user.service.js";
import jwt from 'jsonwebtoken';

export const registerUser = async ({ name, email, password }) => {
    const existing = await findUserBy({ email: email });
    if (existing) throw new Error("Email already taken");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({  
        name: name,
        email: email,
        password: hashedPassword
    })

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;

}

export const loginUser = async ({ email, password }) => {
    const user = await findUserBy({ email: email })
    if (!user) {
        throw new Error('User not found!')
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new Error("Invalid credentils");
    }

    const token = jwt.sign(
        { 
            id: user.id,
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET, 
        { expiresIn: "1d" }
    )

    const { password: _, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token
    }
}