import { NextFunction, Request, Response } from "express";
import { Products } from "../services/fileSystemService/products.class";

/**
 * If the object is not null and the object has a price, stock, title, and thumbnail property, return
 * true, otherwise return false.
 */
const isValidProduct = (object: any): boolean => {
  if (!object?.price || !object?.stock || !object?.title || !object?.thumbnail)
    return false;
  return true;
};

/**
 * If the api_key in the request headers is not equal to the API_KEY in the environment variables, then
 * send a 403 status code and a json object with an error message. Otherwise, call the next function
 * @param {Request} req - Request - This is the request object that is passed to the middleware
 * function.
 * @param {Response} res - Response - This is the response object that we will use to send a response
 * to the client.
 * @param {NextFunction} next - This is a function that you call when you want to move on to the next
 * middleware.
 */
const validApiKey = (req: Request, res: Response, next: NextFunction) => {
  const { api_key } = req.headers;
  if (api_key != process.env.API_KEY) {
    res.status(403);
    res.json({ error: "invalid api_key" });
  } else {
    next();
  }
};

/**
 * This function takes a request and a response, and returns a status code of 200 and a JSON object of
 * all the products.
 * @param {Request} _req - Request - This is the request object that is passed to the function.
 * @param {Response} res - Response - This is the response object that we will use to send back a
 * response to the client.
 */
const getAllProducts = (_req: Request, res: Response) => {
  const products = Products.getAllProducts();
  res.status(200);
  res.json(products);
};

/**
 * If the product doesn't exist, return a 404 status code and an error message, otherwise return a 200
 * status code and the product.
 */
const getSpecificProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const product = Products.getSpecificProduct(id);
  console.log(product);

  if (!product) {
    res.status(404);
    res.json({ error: `this id ${id} doesn't exist` });
  } else {
    res.status(200);
    res.json(product);
  }
};

//-----------------------------------Only admin > products

/**
 * If the product is not valid, send a 406 status code and an error message. Otherwise, add the product
 * to the database and send a 201 status code and a success message.
 * @param {Request} req - Request - this is the request object that is passed to the route handler. It
 * contains information about the request, such as the URL, the HTTP method, the headers, and much
 * more.
 * @param {Response} res - Response - this is the response object that you will use to send back a
 * response to the client.
 */
const postOneProduct = (req: Request, res: Response) => {
  const product = req.body;
  if (!isValidProduct(product)) {
    res.status(406);
    res.json({ error: "missing properties" });
  } else {
    const productAdded = Products.postOneProduct(product);
    res.status(201);
    res.json({
      status: "successfully",
      productAdded,
    });
  }
};

const putUpdateProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const onProduct = req.body;
  const productComplete = Products.getSpecificProduct(id);
  if (!productComplete) {
    res.status(404);
    res.json({ error: `this id ${id} doesn't exist` });
  } else {
    const trueProduct = isValidProduct(onProduct);
    if (!trueProduct) {
      res.status(404);
      res.json({ error: `product fail` });
    } else {
      Products.putUpdateProduct(id, onProduct);
      res.status(201);
      res.json({
        status: "successfully",
        productUpdated: Products.getSpecificProduct(id),
      });
    }
  }
};

/**
 * It deletes a product from the Products array if the product exists, otherwise it returns an error
 * message.
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we will use to send back a
 * response to the client.
 */
const deleteOneProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const product = Products.getSpecificProduct(id);

  if (!product) {
    res.status(404);
    res.json({ error: `this id ${id} doesn't exist` });
  } else {
    Products.deleteOneProduct(id);
    res.status(201);
    res.json({
      status: "successfully",
      message: `product whit id = ${id} deleted`,
    });
  }
};

export {
  getAllProducts,
  getSpecificProduct,
  postOneProduct,
  putUpdateProduct,
  deleteOneProduct,
  validApiKey,
};
