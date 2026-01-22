import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const cleanupChats = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const result = await mongoose.connection.db
  .collection("chats")
  .deleteMany({
    $expr: {
      $ne: [{ $size: "$participants" }, 2]
    }
  });


    console.log(` Cleanup done. Deleted ${result.deletedCount} invalid chats`);
  } catch (error) {
    console.error(" Cleanup failed:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

cleanupChats();
