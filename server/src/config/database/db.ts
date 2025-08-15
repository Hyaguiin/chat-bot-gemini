import mongoose from "mongoose";
import env from "../../utils/envalid";
const _dbUrl = env.DATABASE_URL as string;

export const dbConnect = async () => {
    try {
        await mongoose.connect(_dbUrl);
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
