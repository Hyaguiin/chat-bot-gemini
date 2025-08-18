import { Schema, model, Document } from "mongoose";

export interface IUserSchema extends Document {
  name: string;
  secondname: string;
  email: string;
  password: string;
  birthdate: string;
  cep: string;
}

const UserSchema = new Schema<IUserSchema>({
  name: { type: String, required: true },
  secondname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  
  birthdate: { type: String, required: true },
  cep: { type: String, required: false },
});

export const UserModel = model<IUserSchema>("User", UserSchema);
