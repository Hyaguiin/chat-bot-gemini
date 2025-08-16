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
// ... código anterior ...
exports.wss.on("connection", (ws, req) => {
    console.log('Nova conexão WebSocket estabelecida');
    const origin = req.headers.origin;
    console.log(`Origem da conexão WebSocket: ${origin}`);
    ws.on("message", async (message) => {
        const mensagemTexto = message.toString('utf-8');
        console.log('Mensagem recebida do cliente:', mensagemTexto);
        try {
            // Adicione um log antes de chamar o Gemini
            console.log('Enviando mensagem para o Gemini...');
            // Substitua esta linha com o seu código de chamada à API do Gemini
            const result = await _p_connection_1.model.generateContent(mensagemTexto);
            const response = await result.response;
            const text = response.text();
            // Adicione um log para ver a resposta antes de enviá-la
            console.log('Resposta recebida do Gemini:', text);
            // Envie a resposta de volta ao cliente
            ws.send(text);
            console.log('Resposta enviada para o cliente.');
        }
        catch (error) {
            // Se ocorrer um erro, ele será capturado aqui
            console.error('Erro ao interagir com a API do Gemini:', error);
            // Envie uma mensagem de erro ao cliente para avisá-lo
            ws.send("Desculpe, algo deu errado. Tente novamente.");
        }
    });
    ws.on("close", () => {
        console.log('Conexão WebSocket fechada');
    });
    ws.on("error", (error) => {
        console.error('Erro na conexão WebSocket:', error);
    });
});
