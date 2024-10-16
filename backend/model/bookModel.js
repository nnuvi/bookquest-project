import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
     title:{
          type:String,
          required:true
     },
     author:{
          type:String,
          required:true
     },
     genre:{
          type:String,
          required:true
     },
     publisher:{
          type:String,
     },
     publicationDate:{
          type:Date,
     },
     pageCout:{
          type:Number,
     },
     description:{
          type:String,
     }
}, {timestamps: true});

const Books = mongoose.model("Books", bookSchema);

export default Books;