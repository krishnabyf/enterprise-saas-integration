import express from "express";
import dotenv from "dotenv";
import { queue } from "./queue/queue.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Running ✅");
});

app.post("/webhook", async (req, res) => {
    console.log("Incoming:", req.body);

    await queue.add("event", req.body);

    res.json({ status: "queued" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
