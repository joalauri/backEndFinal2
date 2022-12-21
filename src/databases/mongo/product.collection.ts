import Product from "../../models/product";
import { Product as productType } from "../../types";

export class productCollection{
    
    public static async SELECTALL(){
        return await Product.find({})
    }

    public static async SELECT_ID(productId:string){
        return await Product.find({productId});
    }

    public static async INSERT(product:productType){
        const newProduct = new Product(product)
        return await newProduct.save()
    }

    public static async UPDATE(product:productType){
        return await Product.updateOne({productId:product.productId},{$set:{...product}})
    }

    public static async DELETE(productId:string){
        return await Product.deleteOne({productId});
    }



}