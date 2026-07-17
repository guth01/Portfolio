import type { IncomingMessage, ServerResponse } from "node:http";
import { createServer } from "../server";

const app = createServer();

// Vercel serverless handler — must export a (req, res) function
export default function handler(req: IncomingMessage, res: ServerResponse) {
  return app(req, res);
}
