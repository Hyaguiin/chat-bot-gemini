"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleare = void 0;
const envalid_1 = __importDefault(require("../utils/envalid"));
const SECRET = envalid_1.default.JWT_SECRET_KEY;
const EXPIRES = "1h";
const authMiddleare = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            res.status(401).json({ error: "Token não fornecido ou mal formatado" });
            return;
        }
        const decoded = header?.split(' ')[1];
        if (typeof decoded === "string") {
            res.status(401).json({ error: "Token inválido: retorno inesperado" });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro: ${err.message}`);
        }
        throw new Error("Erro desconhecido!");
    }
};
exports.authMiddleare = authMiddleare;
