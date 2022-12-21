import { Router } from "express"
const routerShopping:Router = Router();
import {
    postNewCart,
    clearCart,
    sendOneProductCart,
    showAllProductCart,
    deleteOneProductCart
}  from '../controllers/shopping.controllers';


routerShopping.post('/',postNewCart )
routerShopping.delete('/:id', clearCart)
routerShopping.post('/:id/products', sendOneProductCart)
routerShopping.get('/:id/products', showAllProductCart)
routerShopping.delete('/:id/products/:id_prod', deleteOneProductCart)

//crear una variable boolean administrador, donde según si es true o false permite alcanzar las rutas indicadas en la sección admin.
//en caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. 

export {routerShopping}