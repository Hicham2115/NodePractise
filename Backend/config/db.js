import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_LINK);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Error Connecting To MongoDB :", err);
    process.exit(1);
  }
};
