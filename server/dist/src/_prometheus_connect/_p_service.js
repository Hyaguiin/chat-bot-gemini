"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
const ws_1 = require("ws");
const envalid_1 = __importDefault(require("../utils/envalid"));
const WS_PORT = envalid_1.default.WS_PORT;
exports.wss = new ws_1.WebSocketServer({
    port: WS_PORT,
    handleProtocols: (protocols, req) => {
        const origin = req.headers.origin;
        console.log(`Conexão WebSocket recebida de origem: ${origin}`);
        const allowedOrigins = envalid_1.default.ALLOWED_ORIGINS.split(',');
        console.log('Allowed Origins:', allowedOrigins);
        if (allowedOrigins.includes(origin)) {
            return "protocol"; // Retorna um protocolo válido
        }
        console.log(`Conexão rejeitada de origem não permitida: ${origin}`);
        return false;
    }
}, () => {
    console.log(`Servidor WebSocket ouvindo na porta ${WS_PORT}`);
});
exports.wss.on("connection", (ws, req) => {
    console.log('Nova conexão WebSocket estabelecida'); // Log de conexão bem-sucedida
    const origin = req.headers.origin;
    console.log(`Origem da conexão WebSocket: ${origin}`); // Log de origem da requisição
    ws.on("message", async (message) => {
        console.log('Mensagem recebida no WebSocket:', message); // Log da mensagem recebida
        // Resto do código...
    });
    ws.on("close", () => {
        console.log('Conexão WebSocket fechada');
    });
    ws.on("error", (error) => {
        console.error('Erro na conexão WebSocket:', error);
    });
});
