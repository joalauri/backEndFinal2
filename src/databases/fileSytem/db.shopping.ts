import fs from 'fs'
import {  Cart,Product } from '../../types';
import Path from "path";
import { randomUUID } from "crypto";


export class DbShopping{
   /* Getting the path of the file cart.json */
    private static path = Path.join(__dirname, '../../../cart.json');
    

    private static id_AutoIncrement():number{
        const carts = this.getAll();
        return (carts[carts.length - 1].id + 1);
    }


    public static getAll(): Array<Cart> {
        try {
            return JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } catch (err) {
            throw new Error(`Error reading the file in this route ${this.path}`);
        }
    }


    private static write(data: Array<Cart>): void {
        try {
            return fs.writeFileSync(this.path, JSON.stringify(data,null,2));
        } catch (err) {
            throw new Error("Error writing the Data");
        }
    }

 
    public static NewCart():Cart{
        try {
            const carts = this.getAll();
            const cart = {
                id:this.id_AutoIncrement(),
                cartId: randomUUID(),
                products:[]
            }
            carts.push(cart);
            this.write(carts);
            return cart
        } catch (error) {
            throw new Error(`error creating new cart, line 43, file:\n${__dirname}`)
        }
    }


    public static clear(cartId:string){
        try {
            const carts = this.getAll();
            const cartsupdated = carts.map((cart:Cart)=> cart.cartId === cartId ? {...cart,products:[]} : cart);
            this.write(cartsupdated);
            return carts.filter((cart:Cart)=> cart.cartId === cartId)[0]
        } catch (error) {
            throw new Error(`Error cleanning cart with id = ${cartId}, line 54, file:\n${__dirname}`);
        }
    }

    public static sendProduct(product:Product, cartId: string):Product{
        try {
            const carts = this.getAll()
            const cartsProductAdd = carts.map((cart:Cart)=>cart.cartId === cartId ? {...cart, product:[...cart.products, product]} : cart) 
            this.write(cartsProductAdd)
            return product
        } catch (error) {
            throw new Error(`Error cleanning cart with id = ${cartId}, line 54, file:\n${__dirname}`);
        }
    }


    public static showAll(cartId:string){
        try {
            const carts = this.getAll();
            const cart = carts.filter((cart:Cart)=> cart.cartId === cartId);
            if(cart.length) return cart[0]
            else return null
        } catch (error) {
            throw new Error(`Error getting cart products with Cartid = ${cartId}, line 71, file:\n${__dirname}`);
        }
    }

   /* Removing the product from the cart. */
    public static removeFromCart(cartId:string, productId:string){
        try {
            const carts = this.getAll()
            const cartsupdated = carts.map((cart:Cart)=>cart.cartId === cartId ? {...cart,products: cart.products.filter((product:Product) => product.productId != productId)} : cart )
            this.write(cartsupdated);
            return cartsupdated.filter((cart:Cart)=> cart.cartId === cartId)[0]
        } catch (error) {
            throw new Error(`Error getting cart products with Cartid = ${cartId}, line 81, file:\n${__dirname}`);
        }
    }
}