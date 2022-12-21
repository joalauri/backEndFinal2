import { DbShopping as db } from "../../databases/fileSytem/db.shopping"
import {  Cart, Product } from '../../types';

export class ShoppingCart{

    public static postNewCart():Cart{
        const cart = db.NewCart();
        return cart;
    }
    public static clearCart(cartId:string):Cart | null{
        if(!db.showAll(cartId)) return null
        const cart = db.clear(cartId);
        return cart;
    }
    public static sendOneProductCart(productUp:Product, cartId:string):Product|null{
        const cartCheq = this.showAllCartProducts(cartId)
        if(!cartCheq) return null
        const productToAdd = db.sendProduct(productUp, cartId)
        return productToAdd
    }
    public static showAllCartProducts(cartId:string):Cart | null{
        if(!db.showAll(cartId)) return null;
        const cart = db.showAll(cartId);
        return cart;
    }
    public static deleteProductCart(cartId:string, productId: string): Cart | null{
        if(!db.showAll(cartId)) return null;
        const cart = db.removeFromCart(cartId,productId)
        return cart
    }
}
