"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.encriptedPassword = exports.genSalt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const genSalt = async () => {
    try {
        let salt = await bcryptjs_1.default.genSalt(10);
        return salt;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro: ${err.message}`);
        }
        throw new Error(`Erro desconhecido!`);
    }
};
exports.genSalt = genSalt;
const encriptedPassword = async (password) => {
    try {
        const salt = await (0, exports.genSalt)();
        if (!password || password === null) {
            throw new Error(`Por favor, forneça a senha`);
        }
        const isEncrypted = await bcryptjs_1.default.hash(password, salt);
        password = isEncrypted;
        return isEncrypted;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro: ${err.message}`);
        }
        throw new Error(`Erro desconhecido!`);
    }
};
exports.encriptedPassword = encriptedPassword;
const verifyPassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcryptjs_1.default.compare(password, hashedPassword);
        return isMatch;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro: ${err.message}`);
        }
        throw new Error(`Erro desconhecido!`);
    }
};
exports.verifyPassword = verifyPassword;
