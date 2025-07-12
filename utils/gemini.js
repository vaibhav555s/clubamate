import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

let chat = null;

export async function initializeChat() {
  if (!chat) {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    chat = await model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Hi there! How can I help you?" }],
        },
      ],
    });
  }
}

export async function sendMessageToGemini(messageText) {
  if (!chat) await initializeChat();

  const result = await chat.sendMessage(messageText);
  const response = await result.response;
  return response.text();
}
