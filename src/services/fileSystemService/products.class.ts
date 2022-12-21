import { randomUUID } from "crypto";
import { Dbproducts as db } from "../../databases/fileSytem/db.products";
import { Product } from "../../types";
// import fs from "fs";
// import { randomUUID } from "crypto";
// import { Product } from "../types";

//los productos dispondrán de los siguientes campos:
//id, name, description, image (url), price.
export class Products {

  private static id_AutoIncrement():number{
    const products = db.readData();
    return (products[products.length - 1].id + 1);
}

  public static getAllProducts() {
    const  getAll= db.readData();
    return getAll;
  }

  public static getSpecificProduct(id:string) {
    const aProduct = db.selectByID(id)
    return aProduct
  }

  public static postOneProduct(product:Product){
        product = {
            ...product,
            id:this.id_AutoIncrement(),
            productId:randomUUID()
        }
        db.addData(product);
        const newProduct = this.getSpecificProduct(product.productId);
        return newProduct;
    }

  public static putUpdateProduct(id:string, productUpdate:Product):null|boolean{
    const trueProduct = this.getSpecificProduct(id)
    if(!trueProduct){
      return null
    }
    db.updateById(id,productUpdate)
   return true
  }

  public static deleteOneProduct(id:string) {
    db.deleteById(id)
  }

}
