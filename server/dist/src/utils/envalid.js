"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
require("dotenv/config");
const env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)({ default: 5000 }),
    WS_PORT: (0, envalid_1.port)({ default: 3000 }),
    ALLOWED_ORIGINS: (0, envalid_1.str)(),
    JWT_SECRET_KEY: (0, envalid_1.str)(),
    JWT_REFRESH: (0, envalid_1.str)(),
    JWT_EXPIRES: (0, envalid_1.str)(),
    GEMINI_API_KEY: (0, envalid_1.str)({ default: 'your-fallback-api-key' }),
    DATABASE_URL: (0, envalid_1.str)(),
    GOOGLE_AVALIABLE_MODELS: (0, envalid_1.str)(),
});
exports.default = env;
