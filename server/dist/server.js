"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app/app"));
const envalid_1 = __importDefault(require("./src/utils/envalid"));
const _p_service_1 = require("./src/_prometheus_connect/_p_service");
const db_1 = require("./src/config/database/db");
const httpServer = app_1.default.listen(envalid_1.default.PORT, async () => {
    try {
        await (0, db_1.dbConnect)();
        console.log(`Server is running on port ${envalid_1.default.PORT}`);
        console.log(`WebSocket server is running on port ${envalid_1.default.WS_PORT}`);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
    }
});
process.on('SIGTERM', () => {
    httpServer.close();
    _p_service_1.wss.close();
    console.log('Servidores encerrados');
});
exports.default = app_1.default;
