import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectToDatabase