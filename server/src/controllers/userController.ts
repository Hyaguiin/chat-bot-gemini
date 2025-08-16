import { UserService } from "../services/userService";
import { Request, Response } from "express";
export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  createUserController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, secondname, email, birthdate, password, cep } = req.body;
      const user = await this.userService.createUserService(req.body);
      res.status(200).json({sucess: true, message: {sucess: true, user}});
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          sucess: false,
          message: `Erro ao criar usuário: ${err.message}`,
        });
        return;
      }
    }
  };
}
