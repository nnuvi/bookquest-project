import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     
     username: {
          type: String,
          required: true,     
          unique: true
     },

     fullName: {
          type: String,
          required: true
     },

     email: {
          type: String,
          required: true,
          unique: true
     },

     password: {
          type: String,
          required: true,
          minlength: 6
     },

     friends: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User',
               default: []
          }
     ],

     profileImg: {
          type: String,
          default: ''
     },

     bio: {
          type: String,
          default: ''
     },

     role: {
          type: String,
          enum: ['admin', 'user'],
          default: 'user'
     },

     bookCollection: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Books',
               default: [],       
          }
     ]

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;