"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envalid_1 = __importDefault(require("../../utils/envalid"));
const _dbUrl = envalid_1.default.DATABASE_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 60000, // Tempo de conexão (1 minuto)
    socketTimeoutMS: 60000, // Tempo de espera pela resposta (1 minuto)
};
const dbConnect = async () => {
    try {
        await mongoose_1.default.connect(_dbUrl, options);
        console.log('Success! DB connected!');
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Failed to connect to database: ${err.message}`);
            throw new Error(`Failed to connect to database!`);
        }
        console.error("Unknown error:", err);
        throw new Error('Unknown error');
    }
};
exports.dbConnect = dbConnect;
