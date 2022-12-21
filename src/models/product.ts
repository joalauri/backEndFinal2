import mongoose from "mongoose";

const fuckingschema = new mongoose.Schema({
    productId:String,
    title:String,
    price:Number,
    stock:Number,
    thumbnail:String
});

export = mongoose.model( 'products', fuckingschema );