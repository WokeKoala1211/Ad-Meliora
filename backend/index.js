import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import twilio from "twilio";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(express.json());

// Debug: print missing env vars
const requiredEnv = [
  "TWILIO_SID",
  "TWILIO_AUTH",
  "TWILIO_NUMBER",
  "RESEND_API_KEY"
];

requiredEnv.forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
  }
});

// Twilio client
const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

// Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/notify", async (req, res) => {
  const { phone, email } = req.body;

  try {
    // SMS
    if (phone) {
      console.log("📨 Sending SMS to:", phone);

      await client.messages.create({
        body: "You're subscribed! AD MELIORA will text you when new drops go live.",
        from: process.env.TWILIO_NUMBER,
        to: phone
      });

      console.log("✅ SMS sent");
    }

    // EMAIL
    if (email) {
      console.log("📧 Sending email to:", email);

      const result = await resend.emails.send({
        from: "AD MELIORA <jobee1211@outlook.com>",
        to: email,
        subject: "You're subscribed to AD MELIORA drops",
        html: `
          <h2>You're subscribed!</h2>
          <p>You'll now receive email notifications when new AD MELIORA drops go live.</p>
          <p>Stay elevated.</p>
        `
      });

      console.log("✅ Email result:", result);
    }

    res.status(200).json({ success: true });

  } catch (err) {
    console.error("❌ Notification Error:", err);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

// Render port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
