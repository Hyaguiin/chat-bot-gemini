"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const userService_1 = require("./userService");
const jwt_1 = require("../utils/jwt");
class AuthService {
    constructor() {
        this.registerUser = async (body) => {
            try {
                const token = await (0, jwt_1.generateToken)(body.email, body.id);
                const register = await this.userService.createUserService(body);
                return { register, token };
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Error("Erro desconhecido!");
            }
        };
        this.loginUser = async (email, password) => {
            try {
                const user = await this.userService.getUserByEmail(email);
                if (!user) {
                    throw new Error(`Usuário não cadastrado!`);
                }
                const token = await (0, jwt_1.generateToken)(user.id, user.email);
                if (!user) {
                    throw new Error(`Usuário não encontrado!`);
                }
                return { user, token };
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Error("Erro desconhecido!");
            }
        };
        this.userService = new userService_1.UserService();
    }
}
exports.AuthService = AuthService;
