import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
     to: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Books',
          required: true,
     },
     type: {
          type: String,
          enum: ['borrow', 'lent'],
          required: true,
     },
     daysPassed: {
          type: Date,
          default: Date.now,
     },
     message: {
          type: String,
          required: true,
     }
}, {timestamps: true});

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;