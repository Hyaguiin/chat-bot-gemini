"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    constructor() {
        this.register = async (req, res) => {
            const { name, email, secondname, cep, bithdate, password } = req.body;
            try {
                const register = await this.authService.registerUser(req.body);
                res.status(200).json({ message: `Usuario autenticado: `, register });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({
                        sucess: false,
                        message: `Erro ao criar usuário: ${err.message}`,
                    });
                    return;
                }
            }
        };
        this.login = async (req, res) => {
            const { email, password } = req.body;
            try {
                const login = await this.authService.loginUser(email, password);
                res.status(200).json({ message: `Usuario autenticado: `, login });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({
                        sucess: false,
                        message: `Erro ao criar usuário: ${err.message}`,
                    });
                    return;
                }
            }
        };
        this.authService = new authService_1.AuthService();
    }
}
exports.AuthController = AuthController;
