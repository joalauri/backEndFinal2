import { Router } from "express"
const routerProduct = Router();
import {
    getAllProducts,
    getSpecificProduct,
    postOneProduct,
    putUpdateProduct,
    deleteOneProduct,
    validApiKey 
} from '../controllers/products.controllers';

routerProduct.get('/', getAllProducts)
routerProduct.get('/:id', getSpecificProduct)

//-----------------------------------Only admin > products

routerProduct.post('/',validApiKey, postOneProduct)
routerProduct.put('/:id', validApiKey, putUpdateProduct)
routerProduct.delete('/:id',validApiKey,  deleteOneProduct)

//crear una variable boolean administrador, donde según si es true o false permite alcanzar las rutas indicadas en la sección admin.
//en caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. 

export {routerProduct}