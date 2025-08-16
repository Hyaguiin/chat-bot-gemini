"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const envalid_1 = __importDefault(require("../utils/envalid"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allDomains = envalid_1.default.ALLOWED_ORIGINS.split(",").map((d) => d.trim());
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allDomains.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
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
app.use('/api/auth', authRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
exports.default = app;
