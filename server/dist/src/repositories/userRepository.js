"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const userModel_1 = require("../models/userModel");
class UserRepository {
    constructor() {
        this.createUser = async (body) => {
            const user = await userModel_1.UserModel.create(body);
            return user;
        };
        this.getUser = async () => {
            const user = await userModel_1.UserModel.find();
            return user;
        };
        this.getUserById = async (id) => {
            const user = await userModel_1.UserModel.findById(id);
            return user;
        };
        this.deleteUserById = async (id) => {
            const user = await userModel_1.UserModel.deleteOne({ _id: id });
            return user;
        };
        this.updateUserById = async (id, body) => {
            const user = await userModel_1.UserModel.findByIdAndUpdate(id, body, { new: true });
            return user;
        };
    }
}
exports.UserRepository = UserRepository;
