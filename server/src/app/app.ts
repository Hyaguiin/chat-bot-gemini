import { Send } from './../../../node_modules/@types/express-serve-static-core/index.d';
import express from 'express';
import cors from 'cors';
import env from '../utils/envalid';
import { METHODS } from 'http';

const app = express();
app.use(express.json());
const corsOptions = {
    origin: env.ALLOWED_ORIGINS.split(','),
    methods: ['GET', 'PUT', 'DELETE', 'POST', 'PATCH', 'OPTIONS'],
    credentials: true,
}

app.use(cors(corsOptions));

app.get('/', (req, res)=>{
    try{
        res.send({message: `Deu certo, servidor rodando!`});
    }catch(err){
        if(err instanceof Error){
            console.error(`Rota não está funcionando!`, err.message);
        }
    }
})

export default app;