import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
     title:{
          type:String,
          required:true
     },

     author:{
          type:[String],
          required:true
     },

     genre:{
          type:[String],
          required:true
     },

     publisher:{
          type:String,
          default: ''
     },

     publicationDate:{
          type:Date,
          default: null
     },

     pageCount:{
          type:Number,
          default: null
     },

     description:{
          type:String,
          default: ''
     },

     isbn: {
          type: String,
          default: '',
          unique: true,
          maxlength: 13,
          trim: true
     },

     bookType: {
          type: String,
          enum: ['myBook', 'borrowedBook', 'lentBook'],
          default: 'myBook',
     },

     bookAdded: {
          type: Date,
          default: Date.now
     },

     borrowedBookId:{
          type:String,
          default: ''
     },

}, {timestamps: true});

const Books = mongoose.model("Books", bookSchema);

export default Books;