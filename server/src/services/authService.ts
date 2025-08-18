import { UserService } from "./userService";
import { UserCreationAtributesDTO } from "../interfaces/userInterface";
import { generateToken } from "../utils/jwt";
export class AuthService {
    private userService: UserService;
    constructor(){
        this.userService = new UserService();
    }

    registerUser = async(body:UserCreationAtributesDTO )=>{
        try{
            const register = await this.userService.createUserService(body);
            return register;
        }catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new Error("Erro desconhecido!");
    }
  };

  loginUser = async(email: string, password: string) => {
    try {

        const user = await this.userService.getUserByEmail(email);
        if(!user){
            throw new Error(`Usuário não cadastrado!`);
        }

        const token = await generateToken(user.id, user.email);
        if (!user) {
            throw new Error(`Usuário não encontrado!`);
        }

        return { user, token};

    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro: ${err.message}`);
        }
        throw new Error("Erro desconhecido!");
    }
};
}
