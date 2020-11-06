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
    category: {
        type:String,
        required:true,
    },
    image:{
        type:String
    },
    user:{
        user:{type:Schema.Types.ObjectId, ref:'User'}
    }
    
},  {timestamps:true});

const Product = mongoose.model("Product" , ProductSchema);
 module.exports = Product; 