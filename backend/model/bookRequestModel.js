import mongoose from "mongoose";

const requestBookSchema = new mongoose.Schema({
     from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },
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
          enum: ['borrow', 'return', 'lent'],
          required: true,
     },
     borrowedDate: {
          type: Date,
          default: Date.now,
     },
     status: {
          type: String,
          enum: ['requested', 'accepted', 'declined'],
          default: 'requested',
     }
}, {timestamps: true});

const BookRequest = mongoose.model('BookRequest', requestBookSchema);

export default BookRequest;