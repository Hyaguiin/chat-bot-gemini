import WebSocket, { WebSocketServer } from "ws";
import env from "../utils/envalid";
import { model } from "./_p_connection";
import { IncomingMessage } from "http";

const WS_PORT = env.WS_PORT;

export const wss = new WebSocketServer({
  port: WS_PORT,
  handleProtocols: (protocols: Set<string>, req: IncomingMessage): string | false => {
    const origin = req.headers.origin as string;
  console.log(`Conexão WebSocket recebida de origem: ${origin}`);
    const allowedOrigins = env.ALLOWED_ORIGINS.split(',');
    console.log('Allowed Origins:', allowedOrigins); 

    if (allowedOrigins.includes(origin)) {
      return "protocol";  // Retorna um protocolo válido
    }

    console.log(`Conexão rejeitada de origem não permitida: ${origin}`);
    return false;  
  }
}, () => {
  console.log(`Servidor WebSocket ouvindo na porta ${WS_PORT}`);
});

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
  console.log('Nova conexão WebSocket estabelecida');  // Log de conexão bem-sucedida

  const origin = req.headers.origin;
  console.log(`Origem da conexão WebSocket: ${origin}`);  // Log de origem da requisição

  ws.on("message", async (message: string | Buffer | ArrayBuffer | Buffer[]) => {
    console.log('Mensagem recebida no WebSocket:', message);  // Log da mensagem recebida
    // Resto do código...
  });

  ws.on("close", () => {
    console.log('Conexão WebSocket fechada');
  });

  ws.on("error", (error: Error) => {
    console.error('Erro na conexão WebSocket:', error);
  });
});


