import env from "../utils/envalid";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");
export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b", 
  generationConfig: {
    maxOutputTokens: 1000,
    temperature: 0.9,
  },
});