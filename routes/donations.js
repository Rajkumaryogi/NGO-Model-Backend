import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Initialize Razorpay Instance
const razorpayInstance = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  1. Create an Order for Payment
router.post("/razorpay", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Verify Payment Signature
router.post("/razorpay/verify", (req, res) => {
  try{
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hash = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (hash === razorpay_signature) {
    res.json({ success: true, message: "Payment verified successfully!" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed-Invalid Signature." });
  }
  }catch(error){
    res.status(500).json({ error: error.message });
  }
});

export default router;
