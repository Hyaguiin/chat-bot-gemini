"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const bycript_1 = require("../utils/bycript");
class UserService {
    constructor() {
        this.createUserService = async (body) => {
            try {
                if (!body || typeof body !== "object") {
                    throw new Error("Forneça o corpo para criação");
                }
                const requiredFields = [
                    "name",
                    "secondname",
                    "email",
                    "birthdate",
                    "password",
                    "cep",
                ];
                const missingFields = requiredFields.filter((field) => !body[field]);
                if (missingFields.length > 0) {
                    throw new Error(`Faltam os seguintes campos no corpo para criação: ${missingFields.join(", ")}`);
                }
                body.password = await (0, bycript_1.encriptedPassword)(body.password);
                const userCreated = await this.repository.createUser(body);
                if (!userCreated) {
                    throw new Error("Usuário não foi criado!");
                }
                console.log(`Usuário Criado: ${JSON.stringify(userCreated)}`);
                return userCreated;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Error("Erro desconhecido!");
            }
        };
        this.updateUserByIdService = async (id, body) => {
            try {
                if (!id) {
                    throw new Error("Forneça o ID para atualização");
                }
                if (!body || typeof body !== "object") {
                    throw new Error("Forneça o corpo para atualização");
                }
                const requiredFields = [
                    "name",
                    "secondname",
                    "email",
                    "birthdate",
                    "password",
                    "cep",
                ];
                const missingFields = requiredFields.filter((field) => !body[field]);
                if (missingFields.length > 0) {
                    throw new Error(`Faltam os seguintes campos no corpo para atualização: ${missingFields.join(", ")}`);
                }
                body.password = await (0, bycript_1.encriptedPassword)(body.password);
                const updatedUser = await this.repository.updateUserById(id, body);
                return updatedUser;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Error("Erro desconhecido!");
            }
        };
        this.getUserService = async () => {
            try {
                const allUser = await this.repository.getUser();
                console.log(`Todos os Usuários: ${JSON.stringify(allUser)}`);
                return allUser;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Error("Erro desconhecido!");
            }
        };
        this.getUserById = async (id) => {
            try {
                const user = await this.repository.getUserById(id);
                console.log(`Usuário: ${JSON.stringify(user)}`);
                return user;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Error("Erro desconhecido!");
            }
        };
        this.getUserByEmail = async (email) => {
            try {
                const user = await this.repository.getUserByEmail(email);
                console.log(`Usuário: ${JSON.stringify(user)}`);
                return user;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Error("Erro desconhecido!");
            }
        };
        this.deleteUserById = async (id) => {
            try {
                if (!id) {
                    throw new Error("Forneça o ID para exclusão");
                }
                const deleted = await this.repository.deleteUserById(id);
                if (deleted.deletedCount === 0) {
                    throw new Error("Usuário não encontrado para exclusão");
                }
                console.log(`Usuário com ID ${id} deletado com sucesso.`);
                return deleted;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Error("Erro desconhecido!");
            }
        };
        this.repository = new userRepository_1.UserRepository();
    }
}
exports.UserService = UserService;
