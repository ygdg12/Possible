import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads"),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `cv-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
  },
});

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@possibletechplc.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "possible-tech-jwt-secret-2026";

function authGuard(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    jwt.verify(header.split(" ")[1], JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
    return res.json({ token });
  }
  return res.status(401).json({ error: "Invalid email or password" });
});

router.get("/jobs", async (_req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

router.post("/jobs", authGuard, async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
});

router.put("/jobs/:id", authGuard, async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
});

router.delete("/jobs/:id", authGuard, async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json({ ok: true });
});

router.post("/upload", (req, res) => {
  upload.single("cv")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  });
});

router.post("/applications", async (req, res) => {
  const app = await Application.create(req.body);
  res.status(201).json(app);
});

router.get("/applications", authGuard, async (_req, res) => {
  const apps = await Application.find().sort({ createdAt: -1 });
  res.json(apps);
});

router.delete("/applications/:id", authGuard, async (req, res) => {
  const app = await Application.findByIdAndDelete(req.params.id);
  if (!app) return res.status(404).json({ error: "Application not found" });
  res.json({ ok: true });
});

export default router;
