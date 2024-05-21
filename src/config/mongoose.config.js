import mongoose from "mongoose";

export const connectToDB = async () => {
    const URL = process.env.DB_URL;
    try {
        await mongoose.connect(URL);
        console.log(`connected to database`);
    } catch (err) {
        console.log(`error in connecting to database`);
    }
}