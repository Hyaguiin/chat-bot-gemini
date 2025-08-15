import { UserRepository } from "../repositories/userRepository";
import { UserCreationAtributesDTO } from "../interfaces/userInterface";
import { encriptedPassword } from "../utils/bycript";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  createUserService = async (body: UserCreationAtributesDTO) => {
    try {
      if (!body || typeof body !== "object") {
        throw new Error("Forneça o corpo para criação");
      }

      const requiredFields: (keyof UserCreationAtributesDTO)[] = [
        "name",
        "secondname",
        "email",
        "birthdate",
        "password",
        "cep",
      ];

      const missingFields = requiredFields.filter((field) => !body[field]);

      if (missingFields.length > 0) {
        throw new Error(
          `Faltam os seguintes campos no corpo para criação: ${missingFields.join(
            ", "
          )}`
        );
      }

      body.password = await encriptedPassword(body.password);
      const userCreated = await this.repository.createUser(body);

      if (!userCreated) {
        throw new Error("Usuário não foi criado!");
      }

      console.log(`Usuário Criado: ${JSON.stringify(userCreated)}`);

      return userCreated;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new Error("Erro desconhecido!");
    }
  };

  updateUserByIdService = async (id: string, body: UserCreationAtributesDTO) => {
    try {
      if (!id) {
        throw new Error("Forneça o ID para atualização");
      }

      if (!body || typeof body !== "object") {
        throw new Error("Forneça o corpo para atualização");
      }

      const requiredFields: (keyof UserCreationAtributesDTO)[] = [
        "name",
        "secondname",
        "email",
        "birthdate",
        "password",
        "cep",
      ];

      const missingFields = requiredFields.filter((field) => !body[field]);

      if (missingFields.length > 0) {
        throw new Error(
          `Faltam os seguintes campos no corpo para atualização: ${missingFields.join(
            ", "
          )}`
        );
      }

      body.password = await encriptedPassword(body.password);

      const updatedUser = await this.repository.updateUserById(id, body);
      return updatedUser;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new Error("Erro desconhecido!");
    }
  };

  getUserService = async () => {
    try {
      const allUser = await this.repository.getUser();
      console.log(`Todos os Usuários: ${JSON.stringify(allUser)}`);
      return allUser;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new Error("Erro desconhecido!");
    }
  };

  deleteUserById = async (id: string) => {
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
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new Error("Erro desconhecido!");
    }
  };
}
