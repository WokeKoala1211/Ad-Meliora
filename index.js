import express from "express";
import cors from "cors";
import twilio from "twilio";

const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

app.post("/notify", async (req, res) => {
    const { phone, email } = req.body;

    try {
        if (phone) {
            await client.messages.create({
                body: "You’re subscribed! AD MELIORA will text you when the next drop goes live.",
                from: process.env.TWILIO_NUMBER,
                to: phone
            });
        }

        // Email support can be added later (SendGrid, Resend, Mailgun, etc.)

        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to send notification" });
    }
});

app.listen(3000, () => console.log("Backend running on port 3000"));
