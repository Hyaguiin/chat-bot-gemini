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
  console.log('Nova conexão WebSocket estabelecida'); 

  const origin = req.headers.origin;
  console.log(`Origem da conexão WebSocket: ${origin}`); 

 ws.on("message", async (message: string | Buffer | ArrayBuffer | Buffer[]) => {
  const mensagemTexto = message.toString('utf-8');

  console.log('Mensagem recebida do cliente:', mensagemTexto); 

  try {
    console.log('Enviando mensagem para o Gemini...');

    const result = await model.generateContent(mensagemTexto);
    const response = await result.response;
    const text = response.text();

    console.log('Resposta recebida do Gemini:', text);

    ws.send(text);
    console.log('Resposta enviada para o cliente.');

  } catch (error) {
    console.error('Erro ao interagir com a API do Gemini:', error);

    ws.send("Desculpe, algo deu errado. Tente novamente.");
  }
});
  ws.on("close", () => {
    console.log('Conexão WebSocket fechada');
  });

  ws.on("error", (error: Error) => {
    console.error('Erro na conexão WebSocket:', error);
  });
});

