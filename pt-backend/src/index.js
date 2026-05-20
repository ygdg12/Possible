import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import chatRouter from "./routes/chat.js";
import { notFound, errorHandler } from "./middleware/errors.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 5000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

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

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${PORT}`);
});

