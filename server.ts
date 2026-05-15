import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API routes
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash", // Use a stable flash model
        contents: [
          {
            role: "user",
            parts: [{ text: "You are Zenith, the AI Assistant for Zenith University. You are helpful, professional, and knowledgeable about the college. If asked about admissions, events, or departments, provide general guidance. If you don't know something specific about Zenith University, be polite and suggest they contact the admissions office at admissions@zenith.edu." }]
          },
          ...history.map((h: any) => ({
            role: h.role,
            parts: [{ text: h.content }]
          })),
          {
            role: "user",
            parts: [{ text: message }]
          }
        ]
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
