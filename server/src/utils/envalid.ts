import { cleanEnv, str, port, num } from 'envalid';

const env = cleanEnv(process.env, {
    PORT: port(),
    ALLOWED_ORIGINS: str(),
    JWT_SECRET_KEY: str(),
    JWT_REFRESH: str(),
    JWT_EXPIRES: str(),
    GEMINI_API_KEY: str(),
})
export default env;