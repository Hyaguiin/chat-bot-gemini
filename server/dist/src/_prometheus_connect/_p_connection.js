"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const envalid_1 = __importDefault(require("../utils/envalid"));
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI(envalid_1.default.GEMINI_API_KEY || "");
exports.model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
    generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
    },
});
