import express from "express";
import SendMessage from "../models/SendMessage.js"; // Correct import statement

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new SendMessage({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
});

export default router;