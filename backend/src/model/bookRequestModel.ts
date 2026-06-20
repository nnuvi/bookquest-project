import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const RequestTypeEnum = ["borrow", "return"] as const;
export const RequestStatusEnum = ["requested", "approved", "declined"] as const;

const RequestBookSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },

    type: {
      type: String,
      enum: RequestTypeEnum,
      required: true,
    },

    borrowedDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: RequestStatusEnum,
      default: "requested",
    },
  },
  { timestamps: true }
);

export type RequestBookSchemaType = InferSchemaType<typeof RequestBookSchema>;

const BookRequest = model<RequestBookSchemaType>(
  "BookRequest",
  RequestBookSchema
);

export default BookRequest;