import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import twilio from "twilio";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(express.json());

// Twilio client
const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

// Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/notify", async (req, res) => {
  const { phone, email } = req.body;

  try {
    // SMS
    if (phone) {
      await client.messages.create({
        body: "You're subscribed! AD MELIORA will text you when new drops go live.",
        from: process.env.TWILIO_NUMBER,
        to: phone
      });
    }

    // EMAIL
    if (email) {
      await resend.emails.send({
        from: "AD MELIORA <no-reply@admelioraapparel.store>",
        to: email,
        subject: "You're subscribed to AD MELIORA drops",
        html: `
          <h2>You're subscribed!</h2>
          <p>You'll now receive email notifications when new AD MELIORA drops go live.</p>
          <p>Stay elevated.</p>
        `
      });
    }

    res.status(200).json({ success: true });

  } catch (err) {
    console.error("Notification Error:", err);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

// Render requires this exact port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
