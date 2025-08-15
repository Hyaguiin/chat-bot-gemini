import bycript from 'bcryptjs';

export const genSalt = async(): Promise<string> =>{
    try{
        let salt = await bycript.genSalt(10);
        return salt;
    }catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new Error(`Erro desconhecido!`);
    }
}

export const encriptedPassword = async(password: string): Promise<string>=>{
    try{
        const salt = await genSalt();
        if(!password || password === null){
            throw new Error(`Por favor, forneça a senha`);
        }
        const isEncrypted = await bycript.hash(password, salt);
        password = isEncrypted; 
        return isEncrypted;
    }catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new Error(`Erro desconhecido!`);
    }
}


export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    const isMatch = await bycript.compare(password, hashedPassword);
    return isMatch;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro: ${err.message}`);
    }
    throw new Error(`Erro desconhecido!`);
  }
};
