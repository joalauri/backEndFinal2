import  express,{Application}  from "express";
// import mongoose from "mongoose";
import { executeConections } from "./connections/index.Connections";
import { productCollection } from "./databases/firebase/product.collection";
import product from "./models/product";



//Initializations
const app:Application = express()
// mongoose.connect("mongodb://127.0.0.1/ecommerce")
// .then(_res =>console.log("database conected"))
// .catch(err => console.log(err))
executeConections()
.then(res=>console.table(res))
.catch(err=>console.table(err))
//Configuration
app.set("port", process.env.PORT || process.argv[2])
const PORT = app.get("port");

//Middleweares
product.find({productId:"9cdffcf8-8d9f-40a9-a6d0-2d63e037944d"}).then(res=>console.log(res))

productCollection.CREATE({
    productId: "MCO657791576",
    title: "Torre Cpu Gamer Ryzen 7 5700g Vega 8 1tb 16gb Pc",
    price: 3049900,
    stock: 1,
    thumbnail: "http://http2.mlstatic.com/D_661268-MCO47189663977_082021-F.jpg"
}).then(res=>console.log(res))

//Routes
//Runnig Server
app.listen(PORT,()=>{
    if(PORT === process.argv[2]) console.log(`server running on port ${PORT}\nhttp://127.0.0.1:${PORT}`)
})




