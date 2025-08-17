"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
const ws_1 = require("ws");
const envalid_1 = __importDefault(require("../utils/envalid"));
const _p_connection_1 = require("./_p_connection");
// Porta do WebSocket
const WS_PORT = envalid_1.default.WS_PORT;
exports.wss = new ws_1.WebSocketServer({
    port: WS_PORT,
    handleProtocols: (protocols, req) => {
        const origin = req.headers.origin;
        console.log(`Conexão WebSocket recebida de origem: ${origin}`);
        const allowedOrigins = envalid_1.default.ALLOWED_ORIGINS.split(",");
        console.log("Allowed Origins:", allowedOrigins);
        if (allowedOrigins.includes(origin)) {
            return "protocol";
        }
        console.log(`Conexão rejeitada de origem não permitida: ${origin}`);
        return false;
    },
}, () => {
    console.log(`Servidor WebSocket ouvindo na porta ${WS_PORT}`);
});
exports.wss.on("connection", (ws, req) => {
    console.log("Nova conexão WebSocket estabelecida");
    const origin = req.headers.origin;
    console.log(`Origem da conexão WebSocket: ${origin}`);
    ws.on("message", async (message) => {
        const mensagemTexto = message.toString("utf-8");
        console.log("Mensagem recebida do cliente:", mensagemTexto);
        try {
            let promptUserMessage = "";
            let context = "";
            try {
                const data = JSON.parse(mensagemTexto);
                console.log("Dados recebidos:", data);
                promptUserMessage = data.message;
                context = data.context || "";
            }
            catch (jsonError) {
                console.log("Erro ao parsear JSON, usando mensagem como texto puro:", jsonError);
                promptUserMessage = mensagemTexto;
            }
            const instruction = `Você é o Prometheus, um assistente financeiro desenvolvido por Hyago Gabriel, Thiago Mello, Marcio Nascimento, Ramon Gonçalves e Boga. Se o usuário perguntar sobre sua origem ou quem te desenvolveu, informe esses nomes. Caso contrário, responda normalmente conforme a pergunta do usuário. Mantenha a conversa de forma natural e objetiva.`;
            const messages = [{ role: "user", parts: [{ text: instruction }] }];
            if (context) {
                messages.push({ role: "user", parts: [{ text: context }] });
            }
            messages.push({ role: "user", parts: [{ text: promptUserMessage }] });
            console.log("Mensagens estruturadas enviadas ao modelo:", JSON.stringify(messages, null, 2));
            const result = await _p_connection_1.model.generateContent({
                contents: messages,
                generationConfig: {
                    temperature: 0.2,
                },
            });
            const response = await result.response;
            console.log("Resposta do modelo:", response);
            const text = await response.text();
            console.log("Texto da resposta:", text);
            ws.send(text);
            console.log("Resposta enviada para o cliente.");
        }
        catch (error) {
            console.error("Erro ao processar a mensagem:", error);
            ws.send("Desculpe, algo deu errado. Tente novamente.");
        }
    });
});
