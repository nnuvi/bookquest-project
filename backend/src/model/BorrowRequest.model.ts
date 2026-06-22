import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

const BorrowRequestSchema = new Schema(
  {
    requester: {
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

    status: {
      type: String,
      enum: ["pending", "approved", "declined", "cancelled", "expired"],
      default: "pending",
      index: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// prevent duplicate active requests
BorrowRequestSchema.index(
  { requester: 1, userBook: 1, status: 1 },
  { unique: true }
);

export type BorrowRequestSchemaType = InferSchemaType<
  typeof BorrowRequestSchema
>;

const BorrowRequest = model<BorrowRequestSchemaType>(
  "BorrowRequest",
  BorrowRequestSchema
);

export default BorrowRequest;