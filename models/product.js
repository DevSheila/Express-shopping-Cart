var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Product Schema
var ProductSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    slug: {
        type:String
    },
    desc: {
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required:true,
    },
    image:{
        type:String
    }
    
},  {timestamps:true});

const Product = mongoose.model("Product" , ProductSchema);
 module.exports = Product; 