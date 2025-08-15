"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envalid_1 = __importDefault(require("../utils/envalid"));
const _dbUrl = envalid_1.default.DATABASE_URL;
const dbConnect = () => {
    try {
        const mongo = mongoose_1.default.connect(_dbUrl).then((sucess) => {
            console.log(`Sucess! db connected!`);
        }).catch((failed) => {
            throw new Error(`Failed to connect to database!`);
        });
        return mongo;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Error: ${err.message}`);
        }
        throw new Error(`Unknown Error`);
    }
};
exports.dbConnect = dbConnect;
