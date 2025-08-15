import { cleanEnv, str, port, num } from 'envalid';
import 'dotenv/config';

const env = cleanEnv(process.env, {
    PORT: port({default: 5000}),
    WS_PORT: port({default: 3000}),
    ALLOWED_ORIGINS: str(),
    JWT_SECRET_KEY: str(),
    JWT_REFRESH: str(),
    JWT_EXPIRES: str(),
    GEMINI_API_KEY: str({ default: 'your-fallback-api-key' }),
    DATABASE_URL: str(),
    GOOGLE_AVALIABLE_MODELS: str(),
})
export default env;