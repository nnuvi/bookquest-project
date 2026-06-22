import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

const BorrowRecordSchema = new Schema(
  {
    borrowRequest: {
      type: Schema.Types.ObjectId,
      ref: "BorrowRequest",
      required: true,
      index: true,
    },

    borrower: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    userBook: {
      type: Schema.Types.ObjectId,
      ref: "UserBook",
      required: true,
      index: true,
    },

    borrowDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["borrowed", "returned", "overdue"],
      default: "borrowed",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export type BorrowRecordSchemaType = InferSchemaType<typeof BorrowRecordSchema>;

const BorrowRecord = model<BorrowRecordSchemaType>(
  "BorrowRecord",
  BorrowRecordSchema
);

export default BorrowRecord;