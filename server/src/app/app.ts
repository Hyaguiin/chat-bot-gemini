import express from 'express';
import cors from 'cors';
import env from '../utils/envalid';
import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/userRoutes';


const app = express();
app.use(express.json());
const allDomains = env.ALLOWED_ORIGINS.split(",").map((d) => d.trim());


const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin) return callback(null, true);
    if (allDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};


app.use(cors(corsOptions));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

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