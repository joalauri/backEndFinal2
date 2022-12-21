import fuckingMongoose from "mongoose"
import { dbConfig } from "../config/MongoDB.config";


export const FunckinMongoose = async ()=>{
    try{
        fuckingMongoose.set("strictQuery", false);
        return await fuckingMongoose.connect(dbConfig.development)
    }catch(err){
        return null
    }
}

