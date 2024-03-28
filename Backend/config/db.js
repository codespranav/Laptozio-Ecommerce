import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

export const connectToDB = async ()=>{
    try {
        const url = await process.env.MONGO_DB_URL;
        mongoose.connect(url)
        console.log("Database Connection Successfull");
    } catch (error) {
        console.log(error);
    }
}
