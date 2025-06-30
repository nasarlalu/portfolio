import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    try {
        if (isConnected) {
            console.log("Reusing existing MongoDB connection");
            return;
        }

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        const db = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "portfolioCollection",
        });

        isConnected = db.connections[0].readyState === 1;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};


