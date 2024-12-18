import mongoose from "mongoose";

let connected = false;

export default async function connectDB() {
    mongoose.set('strictQuery', true)

    // If the database is already connected, don't connect again
    if (connected) {
        console.log('MongoDB is already connected...');

        return;
    }

    // Connect to MongoDb
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;

        console.log('MongoDB connected...');
    } catch (error) {
        console.log(error);
    }
}