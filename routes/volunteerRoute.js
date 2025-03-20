// Import the Express framework to create routes
import express from "express";

// Import the Volunteer model to interact with the Volunteer collection in MongoDB
import Volunteer from "../models/Volunteer.js";

// Create a new router instance to define routes
const router = express.Router();

// Route: Register a new volunteer
router.post("/register", async (req, res) => {
  try {
    // Destructure the request body to extract volunteer details
    const { name, phone, dob, address, email, occupation } = req.body;

    // Check if a volunteer with the same email already exists in the database
    const existingVolunteer = await Volunteer.findOne({ phone });
    if (existingVolunteer) {
      return res.status(400).json({ message: "Volunteer already registered with this phone no." });
    }

    // Create a new volunteer document using the Volunteer model
    const newVolunteer = new Volunteer({ name, phone, dob, address, email, occupation });

    // Save the new volunteer document to the database
    await newVolunteer.save();
    res.status(201).json({ message: "Volunteer registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering volunteer", error });
  }
});

export default router;