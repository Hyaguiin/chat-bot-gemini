import mongoose from "mongoose";
import env from "../../utils/envalid";
const _dbUrl = env.DATABASE_URL as string;


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 60000,  // Tempo de conexão (1 minuto)
  socketTimeoutMS: 60000,   // Tempo de espera pela resposta (1 minuto)
};

export const dbConnect = async () => {
    try {
        await mongoose.connect(_dbUrl, options);
        console.log('Success! DB connected!');
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Failed to connect to database: ${err.message}`);
            throw new Error(`Failed to connect to database!`);
        }
        console.error("Unknown error:", err);
        throw new Error('Unknown error');
    }
};
