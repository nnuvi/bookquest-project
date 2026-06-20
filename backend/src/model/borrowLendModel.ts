import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const BorrowStatusEnum = ["borrowed", "returned"] as const;

const BorrowBookSchema = new Schema(
  {
    borrowedFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    borrowedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },

    borrowDate: {
      type: Date,
      default: Date.now,
    },

    returnDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: BorrowStatusEnum,
      default: "borrowed",
    },
  },
  { timestamps: true }
);

export type BorrowBookSchemaType = InferSchemaType<typeof BorrowBookSchema>;

const BorrowBooks = model<BorrowBookSchemaType>(
  "BorrowBook",
  BorrowBookSchema
);

export default BorrowBooks;