// Import the Express framework to create routes
import express from "express";

// Import the Volunteer model to interact with the Volunteer collection in MongoDB
import NewsLetter from "../models/NewsLatter.js";

// Create a new router instance to define routes
const router = express.Router();

// Route: Register a new volunteer
router.post("/subscribe", async (req, res) => {
  try {
    // Destructure the request body to extract volunteer details
    const {email} = req.body;

    // Check if a volunteer with the same email already exists in the database
    const existingNewsLatter = await NewsLetter.findOne({ email });
    if (existingNewsLatter) {
      return res.status(400).json({ message: "Already subscribed with this email" });
    }

    // Create a new volunteer document using the Volunteer model
    const newNewsLatter = new NewsLetter({email});

    // Save the new volunteer document to the database
    await newNewsLatter.save();
    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error in subscribing", error });
  }
});

export default router;