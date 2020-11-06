var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Page Schema
var categorySchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    slug: {
        type:String
    },
   

},  {timestamps:true});

const Category = mongoose.model("Category" , categorySchema);
 module.exports = Category; 