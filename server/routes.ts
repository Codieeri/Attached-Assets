import OpenAI from "openai";
import type { Express } from "express";
import { type Server } from "http";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  console.log("✅ registerRoutes called");

  // ✅ TEST API
  app.get("/api/test", (req, res) => {
    return res.json({ message: "API working ✅" });
  });

  // ✅ OpenAI API
  app.post("/api/ask", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "message is required" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      });

      return res.json({
        reply: response.choices[0]?.message?.content || "No reply",
      });
    } catch (err) {
      console.log("OpenAI failed:", err);
      return res.status(500).json({ error: "OpenAI failed" });
    }
  });

  return httpServer;
}
