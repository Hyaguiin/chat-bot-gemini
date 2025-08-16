"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envalid_1 = __importDefault(require("./envalid"));
const SECRET = envalid_1.default.JWT_SECRET_KEY;
const EXPIRES = "1h";
const generateToken = async (email) => {
    try {
        const payload = {
            userEmail: email,
        };
        const token = await jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: EXPIRES });
        return token;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro: ${err.message}`);
        }
        throw new Error(`Erro desconhecido!`);
    }
};
exports.generateToken = generateToken;
const verifyToken = async (token) => {
    try {
        const valid = await jsonwebtoken_1.default.verify(token, SECRET);
        if (typeof valid === "string") {
            throw new Error("Token inválido: payload retornou como string");
        }
        return valid;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro: ${err.message}`);
        }
        throw new Error(`Erro desconhecido!`);
    }
};
exports.verifyToken = verifyToken;
const refreshToken = async (oldToken) => {
    try {
        if (!oldToken) {
            throw new Error("Campo faltando: oldToken");
        }
        const decode = jsonwebtoken_1.default.verify(oldToken, SECRET, { ignoreExpiration: true });
        if (typeof decode === "string") {
            throw new Error("Token inválido: payload retornou como string");
        }
        const { userId, userEmail } = decode;
        if (!userId || !userEmail) {
            throw new Error("Campos obrigatórios ausentes no token");
        }
        const token = jsonwebtoken_1.default.sign({ userId, userEmail }, SECRET, {
            expiresIn: EXPIRES,
        });
        return token;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao renovar token: ${err.message}`);
        }
        throw new Error("Erro desconhecido ao gerar refresh token.");
    }
};
exports.refreshToken = refreshToken;
