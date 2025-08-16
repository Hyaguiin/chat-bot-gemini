"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    secondname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
    cep: { type: Number, required: false },
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
