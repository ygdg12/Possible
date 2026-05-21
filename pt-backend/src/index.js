import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

import chatRouter from "./routes/chat.js";
import adminRouter from "./routes/admin.js";
import { notFound, errorHandler } from "./middleware/errors.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 5000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://yaredgirmab1234_db_user:XEXxKOsrjCneO5TD@cluster0.rp9qhx0.mongodb.net/possible-tech?retryWrites=true&w=majority";

app.use(helmet());
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "possible-technology-backend" });
});

app.use("/api/chat", chatRouter);
app.use("/api/admin", adminRouter);

app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

