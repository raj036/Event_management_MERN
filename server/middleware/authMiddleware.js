import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import User from "../models/User.js";

dotenv.config();

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(404).json({ success: false, error: "Token not provided" })
        }

        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        if (!decoded) {
            return res.status(404).json({ success: false, error: "Token not valid" })
        }

        const user = await User.findById({ _id: decoded._id }).select('-password')
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" })
        }
        req.user = user

        next()
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ success: false, error: "Server side error" })
    }
}

export default verifyUser