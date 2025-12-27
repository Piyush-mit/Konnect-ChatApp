import mongoose from "mongoose";
import { config } from "dotenv";

config();
const MongoURL = process.env.MONGO_URL;
const connectDb = async () => {
    try {
        console.log("Connecting to Database...");
        if(!MongoURL){
            throw new Error ("Database URL not found");
        }

        await mongoose.connect(MongoURL,{
            autoIndex : false ,
            serverSelectionTimeoutMS : 5000 
        });

        console.log("Connected to Database");

    } catch ( error : any ) {
        console.error("Connection to Database failed" , error.message);
        process.exit(1);
    }
}

export default connectDb;