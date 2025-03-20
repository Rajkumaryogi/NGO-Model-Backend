// Import the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Define the schema for the Volunteer collection in MongoDB
const NewsLatterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }
  },
    // Enable timestamps to automatically add 'createdAt' and 'updatedAt' fields
  { timestamps: true }
);

// Create and export a Mongoose model named 'NewsLatter' based on the schema
export default mongoose.model("NewsLatter", NewsLatterSchema);
