import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectToDatabase = async () => {
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI,{
            dbName: DB_NAME
        });
        console.log("\n Connected to MongoDB", `${connectionInstance.connection.host}`);
    }catch(error){
        console.error("Failed to connect to MongoDB",);  
        process.exit(1);
    }
};

export default connectToDatabase;