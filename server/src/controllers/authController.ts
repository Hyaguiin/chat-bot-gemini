import { AuthService } from "../services/authService";
import { Request, Response } from "express";

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }


  register = async (req: Request, res: Response): Promise<void> => {
    const {name, email, secondname, cep, bithdate, password } = req.body;
    try {
        const login = await this.authService.registerUser(req.body);
        res.status(200).json({message: `Usuario autenticado: `, login});
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

  login = async (req: Request, res: Response): Promise<void> => {
    const {email, password, id} = req.body;
    try {
        const login = await this.authService.loginUser(email, password);
        res.status(200).json({message: `Usuario autenticado: `, login});
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
