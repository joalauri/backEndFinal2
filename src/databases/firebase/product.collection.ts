import { executeFirebase } from '../../connections/Firebase.Client';
import { Product } from '../../types';

export class productCollection{


    public static async DB(){
    return (await executeFirebase())?.firestore().collection("products");
    }

    public static async CREATE(product:Product){
        return (await this.DB())?.doc().create(product)
    }




}