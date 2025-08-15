import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../utils/envalid";
const SECRET = env.JWT_SECRET_KEY as string;
const EXPIRES = "1h";
import { Request, Response, NextFunction } from "express";

export const authMiddleare = async(req: Request, res: Response, next: NextFunction):Promise<void>=>{
    try{
        const header = req.headers.authorization;
       
         if (!header || !header.startsWith("Bearer ")) {
      res.status(401).json({ error: "Token não fornecido ou mal formatado" });
      return;
    }

        const decoded = header?.split(' ')[1];
       
        if (typeof decoded === "string") {
      res.status(401).json({ error: "Token inválido: retorno inesperado" });
      return;
    }
       req.user = decoded;
        next();
    }catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new Error("Erro desconhecido!");
    }
  };