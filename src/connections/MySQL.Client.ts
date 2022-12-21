import {createPool} from "mysql2/promise";
import { mysqlDBConfig } from "../config/MySQL.config";

export const mysqlDB = async ()=>{
    try{
        return await createPool(mysqlDBConfig).getConnection()
    }catch(err){
        return null
    }
};

