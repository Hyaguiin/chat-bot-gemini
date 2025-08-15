import app from "./src/app/app";
import env from "./src/utils/envalid";
import { wss } from "./src/_prometheus_connect/_p_service";
import { dbConnect } from "./src/config/database/db";


const httpServer = app.listen(env.PORT, async () => {
    try {
        await dbConnect();
        console.log(`Server is running on port ${env.PORT}`);
        console.log(`WebSocket server is running on port ${env.WS_PORT}`);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
    }
});

process.on('SIGTERM', () => {
    httpServer.close();
    wss.close();
    console.log('Servidores encerrados');
});

export default app;