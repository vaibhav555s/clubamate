import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

let chat = null;

export async function initializeChat() {
  if (!chat) {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const context = await fetchFirebaseData();

    chat = await model.startChat({
      systemInstruction: {
        role: "user",
        parts: [
          {
            text: `
  You are a helpful AI assistant built for a college event website.
  
  Answer ONLY questions related to:
  - Events happening in college
  - Clubs and their details
  - Suggestions for students based on interests or time
  
  If a question is outside of this, politely say you’re only trained for event/club assistance.
  Keep replies friendly and student-oriented.
  But yes, if the user asks about the current context, you can provide it even if the information is not directly given to you but you can use some general knowledge to answer it like if someone asks something about the event like for example roadmap then even if the roadmap is not given to you but still you answer it by common sense.
  Use the context below to guide your answers:
  
  ${context}
            `,
          },
        ],
      },
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
  

async function fetchFirebaseData() {
  // Fetch Events
  const eventSnapshot = await getDocs(collection(db, "events"));
  const events = eventSnapshot.docs.map((doc) => doc.data());

  // Fetch Clubs
  const clubSnapshot = await getDocs(collection(db, "clubs"));
  const clubs = clubSnapshot.docs.map((doc) => doc.data());

  // Format for Gemini
  const formattedEvents = events
    .map((e) => `- ${e.title} on ${e.date}, ${e.time} at ${e.location}`)
    .join("\n");

  const formattedClubs = clubs
    .map((c) => `- ${c.name}: ${c.description}`)
    .join("\n");

  return `
Events:
${formattedEvents}

Clubs:
${formattedClubs}
  `;
}

export async function sendMessageToGemini(messageText) {
  if (!chat) await initializeChat();

  const result = await chat.sendMessage(messageText);
  const response = await result.response;
  return response.text();
}
  
