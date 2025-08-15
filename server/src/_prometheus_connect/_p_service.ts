import WebSocket, { WebSocketServer } from "ws";
import env from "../utils/envalid";
import { model } from "./_p_connection";
import { IncomingMessage } from "http";

const WS_PORT = env.WS_PORT;

export const wss = new WebSocketServer({
  port: WS_PORT,
  handleProtocols: (protocols: Set<string>, req: IncomingMessage): string | false => {
    const origin = req.headers.origin as string;
    const allowedOrigins = env.ALLOWED_ORIGINS.split(',');

    if (allowedOrigins.includes(origin)) {
      return "protocol";  // Retorna um protocolo válido
    }

    console.log(`Conexão rejeitada de origem não permitida: ${origin}`);
    return false;  
  }
}, () => {
  console.log(`Servidor WebSocket ouvindo na porta ${WS_PORT}`);
});

wss.on("connection", (ws: WebSocket) => {
  console.log('Nova conexão WebSocket estabelecida');

  ws.on("message", async (message: string | Buffer | ArrayBuffer | Buffer[]) => {
    try {
      let messageString: string;
      if (typeof message === 'string') {
        messageString = message;
      } else if (Buffer.isBuffer(message)) {
        messageString = message.toString('utf-8');
      } else if (message instanceof ArrayBuffer) {
        messageString = Buffer.from(message).toString('utf-8');
      } else {
        const buffers = message.map(item => Buffer.isBuffer(item) ? item : Buffer.from(item));
        messageString = Buffer.concat(buffers).toString('utf-8');
      }

      if (typeof messageString !== 'string' || messageString.trim().length === 0) {
        throw new Error('Mensagem inválida');
      }

      const result = await model.generateContent(messageString);

      if (!result || !result.response) {
        throw new Error('Resposta da API vazia');
      }

      const text = await result.response.text();
      ws.send(text);

    } catch (error) {
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

  ws.on("error", (error: Error) => {
    console.error('Erro na conexão WebSocket:', error);
  });
});
