"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    constructor() {
        this.createUserController = async (req, res) => {
            try {
                const { name, secondname, email, birthdate, password, cep } = req.body;
                const user = await this.userService.createUserService(req.body);
                res.status(200).json({ sucess: true, message: { sucess: true, user } });
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
        this.userService = new userService_1.UserService();
    }
}
exports.UserController = UserController;
