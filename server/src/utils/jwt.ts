import { MyTokenPayload } from "./../interfaces/myTokenPayload";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "./envalid";
const SECRET = env.JWT_SECRET_KEY as string;
const EXPIRES = "1h";

export const generateToken = async (

  email: string
): Promise<string> => {
  try {
    const payload = {
      
      userEmail: email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
    return token;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro: ${err.message}`);
    }
    throw new Error(`Erro desconhecido!`);
  }
};

export const verifyToken = async (token: string): Promise<JwtPayload> => {
  try {
    const valid = await jwt.verify(token, SECRET);
    if (typeof valid === "string") {
      throw new Error("Token inválido: payload retornou como string");
    }
    return valid;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro: ${err.message}`);
    }
    throw new Error(`Erro desconhecido!`);
  }
};

export const refreshToken = async (oldToken: string): Promise<string> => {
  try {
    if (!oldToken) {
      throw new Error("Campo faltando: oldToken");
    }

    const decode = jwt.verify(oldToken, SECRET, { ignoreExpiration: true });

    if (typeof decode === "string") {
      throw new Error("Token inválido: payload retornou como string");
    }

    const { userId, userEmail } = decode as MyTokenPayload;

    if (!userId || !userEmail) {
      throw new Error("Campos obrigatórios ausentes no token");
    }

    const token = jwt.sign({ userId, userEmail }, SECRET, {
      expiresIn: EXPIRES,
    });

    return token;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao renovar token: ${err.message}`);
    }
    throw new Error("Erro desconhecido ao gerar refresh token.");
  }
};