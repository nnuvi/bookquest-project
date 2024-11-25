import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
     from:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },
     to:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },
     type:{
          type: String,
          required: true,
          enum: ['reminder', 'bookRequest', 'follow']
     },
     read: {
          type: Boolean,
          default: false,
     },
     message:{
          type: String,
          required: true
     },
     request:{
          type: String,
          enum: ['approved', 'declined']
     },
     book:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
     }
}, { timestamps: true});  

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;