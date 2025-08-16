"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
const ws_1 = require("ws");
const envalid_1 = __importDefault(require("../utils/envalid"));
const _p_connection_1 = require("./_p_connection");
const WS_PORT = envalid_1.default.WS_PORT;
exports.wss = new ws_1.WebSocketServer({
    port: WS_PORT,
    handleProtocols: (protocols, req) => {
        const origin = req.headers.origin;
        const allowedOrigins = envalid_1.default.ALLOWED_ORIGINS.split(',');
        if (allowedOrigins.includes(origin)) {
            return "protocol"; // Retorna um protocolo válido
        }
        console.log(`Conexão rejeitada de origem não permitida: ${origin}`);
        return false;
    }
}, () => {
    console.log(`Servidor WebSocket ouvindo na porta ${WS_PORT}`);
});
exports.wss.on("connection", (ws) => {
    console.log('Nova conexão WebSocket estabelecida');
    ws.on("message", async (message) => {
        try {
            let messageString;
            if (typeof message === 'string') {
                messageString = message;
            }
            else if (Buffer.isBuffer(message)) {
                messageString = message.toString('utf-8');
            }
            else if (message instanceof ArrayBuffer) {
                messageString = Buffer.from(message).toString('utf-8');
            }
            else {
                const buffers = message.map(item => Buffer.isBuffer(item) ? item : Buffer.from(item));
                messageString = Buffer.concat(buffers).toString('utf-8');
            }
            if (typeof messageString !== 'string' || messageString.trim().length === 0) {
                throw new Error('Mensagem inválida');
            }
            const result = await _p_connection_1.model.generateContent(messageString);
            if (!result || !result.response) {
                throw new Error('Resposta da API vazia');
            }
            const text = await result.response.text();
            ws.send(text);
        }
        catch (error) {
            let errorMessage = 'Desculpe, houve um erro ao processar sua solicitação.';
            if (error instanceof Error) {
                errorMessage += ` Detalhes: ${error.message}`;
            }
            ws.send(errorMessage);
        }
    });
    ws.on("close", () => {
        console.log('Conexão WebSocket fechada');
    });
    ws.on("error", (error) => {
        console.error('Erro na conexão WebSocket:', error);
    });
});
