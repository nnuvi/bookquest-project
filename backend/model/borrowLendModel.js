import mongoose from "mongoose";

const borrowBookSchema = new mongoose.Schema({
     borrowedFrom: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     borrowedTo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Books',
          required: true,
     },
     borrowedDate: {
          type: Date,
          default: Date.now,
     },
     status: {
          type: String,
          enum: ['borrowed', 'returned'],
     }
}, {timestamps: true});

const BorrowBook = mongoose.model('BorrowBook', borrowBookSchema);

export default BorrowBook;