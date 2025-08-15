import { port } from "envalid";
import app from "./src/app/app";
import env from "./src/utils/envalid";

app.listen(env.PORT, async()=>{
    try{
        console.log(`Server is running on port ${env.PORT}`);
    }catch(err){
        if(err instanceof Error){
            console.error(err.message);
        }
    }
});

export default app;