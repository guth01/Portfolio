import dotenv from "dotenv";
dotenv.config(); // no-op if .env is missing (e.g. Vercel injects env vars directly)
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleContactPost } from "./routes/contact";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleContactPost);

  return app;
}
