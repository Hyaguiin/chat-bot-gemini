import { error } from "console";
import { UserCreationAtributesDTO } from "../interfaces/userInterface";
import {UserModel} from '../models/userModel';
import { rejects } from "assert";
import { resolve } from "path";


export class UserRepository {
    constructor(){
    }

    createUser = async(body: UserCreationAtributesDTO)=>{
        const user = await UserModel.create(body);
        return user;
    }

    getUser = async()=>{
        const user = await UserModel.find();
        return user;
    }
   
     getUserById = async(id: string)=>{
       
        const user = await UserModel.findById(id);
        return user;
     };


      getUserByEmail = async(email: string)=>{
       
        const user = await UserModel.findOne({email});
        return user;
     };

      deleteUserById = async(id: string)=>{
    
        const user = await UserModel.deleteOne({_id: id});
        return user;
      };

      updateUserById = async(id: string, body: UserCreationAtributesDTO)=>{
        const user = await UserModel.findByIdAndUpdate(id, body, {new: true});
        return user;
      };
}