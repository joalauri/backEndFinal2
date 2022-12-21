import { executeFirebase } from "./Firebase.Client";
import { mysqlDB } from "./MySQL.Client";
import { FunckinMongoose } from "./MongoDB.Client";


export const executeConections =async ()=>{
    return new Promise(async(resolve, rejected)=>{
        try {
            const fuckingFirebaseConection =await executeFirebase();
            const FunckinMongooseConection =await FunckinMongoose();
            const FuckingMysqlConection =await mysqlDB();
            
            if(!FunckinMongooseConection || !FuckingMysqlConection || !fuckingFirebaseConection){
                rejected({
                    DataBases_Status:{
                        MySQL:!FuckingMysqlConection ? `Error ❌` : `Connected 🚀`,
                        MongoDb:!FunckinMongooseConection ? `Error ❌` : `Connected 🚀`,
                        Firebase:!fuckingFirebaseConection ? `Error ❌` : `Connected 🚀`,
                        LocalJSON:null
                    }
                })
            }
            resolve({DataBases_Status:{
                MySQL:`Connected 🚀`,
                MongoDb:`Connected 🚀`,
                Firebase:`Connected 🚀`,
                LocalJSON:null
            }});
    
        } catch (err) {
            console.log(err + "fucking error")
        }
    })

}
