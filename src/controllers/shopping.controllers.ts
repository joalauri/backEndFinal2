/* Importing the randomUUID function from the crypto module. */

import { Request, Response } from "express";
import { Products } from "../services/fileSystemService/products.class";
import { ShoppingCart } from "../services/fileSystemService/shopping.class";

/**
 * This function creates a new shopping cart and returns it to the client.
 */
const postNewCart = (_req: Request, res: Response) => {
  const cart = ShoppingCart.postNewCart();
  res.status(201);
  res.json(cart);
};

/**
 * It takes a request and a response, and returns a response with a status code and a json object.
 */
const clearCart = (req: Request, res: Response) => {
  const { id } = req.params;
  const cart = ShoppingCart.clearCart(id);
  if (cart === null) {
    res.status(404);
    res.json({ err: `component with id :${id} doesn't exist` });
  } else {
    res.status(201);
    res.json(cart);
  }
};

/**
 * It takes a productId and a cartId from the params, then it gets the product from the Products class,
 * if the product doesn't exist it returns an error, if it does exist it sends the product to the cart,
 * if the cart doesn't exist it returns an error, if it does exist it returns the cart with the product
 * in it.
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
const sendOneProductCart = (req: Request, res: Response) => {
  const { productId, id } = req.params;
  const productToCart = Products.getSpecificProduct(productId);
  if (!productToCart) {
    res.status(404);
    res.json({ err: `component with id :${productId} doesn't exist` });
  } else {
    const productAndCart = ShoppingCart.sendOneProductCart(productToCart, id);
    if (!productAndCart) {
      res.status(404);
      res.json({ err: `component with id :${id} doesn't exist` });
    } else {
      res.status(201);
      res.json({
        cart: ShoppingCart.showAllCartProducts(id),
      });
    }
  }
};

/**
 * It's a function that takes in a request and a response, and returns a cart object.
 */
const showAllProductCart = (req: Request, res: Response) => {
  const { id } = req.params;
  const cart = ShoppingCart.showAllCartProducts(id);
  if (!cart) {
    res.status(404);
    res.json({ err: `component with id :${id} doesn't exist` });
  } else {
    res.status(201);
    res.json(cart);
  }
};

/**
 * It deletes a product from a shopping cart.
 */
const deleteOneProductCart = (req: Request, res: Response) => {
  const { id, id_prod } = req.params;
  const product = Products.getSpecificProduct(id_prod);
  if (!product) {
    res.status(404);
    res.json({
      err: `che boludo este product with id :${id_prod} doesn't exist`,
    });
  } else {
    const cart = ShoppingCart.deleteProductCart(id, id_prod);
    if (!cart) {
      res.status(404);
      res.json({ err: `component with id :${id} doesn't exist` });
    } else {
      res.status(201);
      res.json(cart);
    }
  }
};

export {
  postNewCart,
  clearCart,
  sendOneProductCart,
  showAllProductCart,
  deleteOneProductCart,
};
