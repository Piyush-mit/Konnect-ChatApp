"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const MongoURL = process.env.MONGO_URL;
const connectDb = async () => {
    try {
        console.log("Connecting to Database...");
        if (!MongoURL) {
            throw new Error("Database URL not found");
        }
        await mongoose_1.default.connect(MongoURL, {
            autoIndex: false,
            serverSelectionTimeoutMS: 5000
        });
        console.log("Connected to Database");
    }
    catch (error) {
        console.error("Connection to Database failed", error.message);
        process.exit(1);
    }
};
exports.default = connectDb;
//# sourceMappingURL=database.js.map