"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const envalid_1 = __importDefault(require("../utils/envalid"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: envalid_1.default.ALLOWED_ORIGINS.split(','),
    methods: ['GET', 'PUT', 'DELETE', 'POST', 'PATCH', 'OPTIONS'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.get('/', (req, res) => {
    try {
        res.send({ message: `Deu certo, servidor rodando!` });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Rota não está funcionando!`, err.message);
        }
    }
});
exports.default = app;
