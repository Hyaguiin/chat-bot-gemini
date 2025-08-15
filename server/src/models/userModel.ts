import { Schema, model, Document } from "mongoose";

export interface IUserSchema extends Document {
  name: string;
  secondname: string;
  email: string;
  password: string;
  birthdate: Date;
  cep: number;
}

const UserSchema = new Schema<IUserSchema>({
  name: { type: String, required: true },
  secondname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    try: String,
    required: true,
  },
  birthdate: { type: Date, required: true },
  cep: { type: Number, required: false },
});

export const UserModel = model<IUserSchema>("User", UserSchema);
