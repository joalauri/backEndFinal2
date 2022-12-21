import fs from "fs";
import Path from "path";
import { Product } from "../../types";

export class Dbproducts {
  private static path = Path.join(__dirname, "../../../products.json");

 public static writeData(data: string): void {
    try {
      return fs.writeFileSync(this.path, data);
    } catch (err) {
      throw new Error("Error adding new Data");
    }
  }

 public static readData(): Array<Product> {
    try {
      return JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } catch (err) {
      throw new Error(`Error reading the file in this route ${this.path}`);
    }
  }

 public static addData(product: Product): Array<Product> {
    try {
      const products = this.readData();
      products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(products,null,2));
      return products;
    } catch (err) {
      throw new Error("Error adding new Data");
    }
  }

 public static updateById(id:string, productUp:Product) {
    try {
      const product = this.readData();
      const productToChange = product.map((product:Product)=> product.productId === id ? {...productUp, id:product.id, productId:product.productId}:product)
      this.writeData(JSON.stringify(productToChange, null, 2))
      return productToChange
    } catch (err) {
      throw new Error("Error update fail");
    }
  }


 public static deleteById(id:string) {
    try {
       let products = this.readData()
      products.forEach((element) => {
        if (element.productId === id) {
          let i = products.indexOf(element);
          if (i === 0) {
         products.splice(i, 1);
          }
          products.splice(i, i);
        }
      });
      fs.writeFileSync(this.path, JSON.stringify(products,null,2));
    } catch (error) {
        throw new Error("Error DELETE fail")
    }
  }

 public static selectByID(id:string):Product|null{
    try {
        const product = this.readData()
        const productSelect = product.filter((product:Product)=> product.productId == id);
        if(productSelect.length) return productSelect[0]
        else return null
    }catch(error) {
        throw new Error("Error")
    }
  }
}
