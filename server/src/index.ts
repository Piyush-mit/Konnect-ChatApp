import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv';
import connectDb from './config/database';
import { userRouter } from './routes/user.routes';
import { messageRouter } from './routes/message.routes';

config();

const app = express();
const PORT = process.env.PORT || 5000;
const clientURL = process.env.CLIENT_URL;

const REQUIRED_ENV_VARIABLES = ["MONGO_URL" , "JWT_SECRET" , "PORT" , "CLIENT_URL" , "NODE_ENV"];
for(const key of REQUIRED_ENV_VARIABLES){
    if(!process.env[key]){
        console.error(`Missing environment variable: ${key}`);
        process.exit(1);
    }
}

app.use(express.json())
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: clientURL
}))


app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server active at port ${PORT}`);
        })
    } catch (error: any) {
        console.error("Failed to start server", error.message);
        process.exit(1);
    }
}

startServer();