import {JwtPayload} from 'jsonwebtoken'

export interface MyTokenPayload extends JwtPayload{
    userId: string;
    userEmail: string;
}