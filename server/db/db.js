import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
    }
}

export default connectToDatabase