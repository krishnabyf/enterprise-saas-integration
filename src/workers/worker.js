import { Worker } from "bullmq";
import axios from "axios";
import { pool } from "../db/db.js";
import dotenv from "dotenv";

dotenv.config();

console.log("Worker started...");

// Create Worker
const worker = new Worker(
  "jobs",
  async (job) => {
    console.log("Processing job:", job.data);

    try {
      // ============================
      // 1. CALL STRIPE (or mock)
      // ============================
      let count = 0;

      try {
        const res = await axios.get(
          "https://api.stripe.com/v1/customers",
          {
            headers: {
              Authorization: `Bearer ${process.env.STRIPE_KEY}`,
            },
          }
        );

        count = res.data.data.length;
        console.log("Stripe Customers:", count);

      } catch (err) {
        console.log("Stripe Error (using mock):", err.message);
        count = 10; // fallback mock
      }

      // ============================
      // 2. SAVE TO DATABASE
      // ============================
      await pool.query(
        "INSERT INTO events (data) VALUES ($1)",
        [JSON.stringify({ input: job.data, stripeCount: count })]
      );

      console.log("Saved to DB ✅");

      // ============================
      // 3. SEND SLACK NOTIFICATION
      // ============================
      try {
        await axios.post(process.env.SLACK_WEBHOOK_URL, {
          text: `New Event 🚀\nUser: ${job.data.user}\nCustomers: ${count}`
        });

        console.log("Slack notification sent ✅");

      } catch (err) {
        console.log("Slack Error:", err.message);
      }

    } catch (err) {
      console.log("Worker Error:", err.message);
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  }
);

// ============================
// EVENTS (IMPORTANT FOR DEBUG)
// ============================

worker.on("completed", () => {
  console.log("Job completed 🎉");
});

worker.on("failed", (job, err) => {
  console.log("Job failed ❌", err.message);
});