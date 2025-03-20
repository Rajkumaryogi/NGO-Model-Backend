// Import the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Define the schema for the Volunteer collection in MongoDB
const VolunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    occupation: { type: String, required: true },
  },
    // Enable timestamps to automatically add 'createdAt' and 'updatedAt' fields
  { timestamps: true }
);

// Create and export a Mongoose model named 'Volunteer' based on the schema
export default mongoose.model("Volunteer", VolunteerSchema);
