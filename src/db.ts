import mongoose from "mongoose";
import { MONGODB_CONN_STRING } from "./config";

export default function handleMongoConnection() {
    if (!MONGODB_CONN_STRING) throw Error("Error connecting to database: mongo uri is missing.")
    mongoose.connect(MONGODB_CONN_STRING, { authSource: "admin" }).then(() => {
        console.log("Connected to mongo server.");
    }).catch(error => console.log(`Error connecting to database: ${error}`));
}