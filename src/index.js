import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})
import app from "./app.js";
import connectToDatabase from "./db/index.js";
import { DB_NAME } from "./constants.js";


connectToDatabase()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`${DB_NAME} server is running on port ${process.env.PORT}`);
    });
    app.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });
})
.catch((err) => {
    console.error("Failed to connect to MongoDB !!!", err);
});