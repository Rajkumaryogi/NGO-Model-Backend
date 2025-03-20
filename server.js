import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import volunteerRoute from "./routes/volunteerRoute.js";
import newsLatterRoute from "./routes/newsLatterRoute.js"
import sendMessageRoute from "./routes/sendMessageRoute.js"
import bodyParser from "body-parser";
import donationRoutes from "./routes/donations.js";

dotenv.config();
const PORT = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Enable JSON body parsing

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => 
  console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Backend Running & MongoDB Connected 🚀");
});

app.use("/api/donations", donationRoutes);
app.use("/api/volunteers", volunteerRoute);
app.use("/api/sendMessageRoute", sendMessageRoute);
app.use("/api/newsLatter", newsLatterRoute);


// Start Server
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
