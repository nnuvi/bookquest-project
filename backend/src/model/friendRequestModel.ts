import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const FriendRequestStatusEnum = ["pending", "accepted"] as const;

const FriendRequestSchema = new Schema(
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

    sentTime: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: FriendRequestStatusEnum,
      default: "pending",
    },
  },
  { timestamps: true }
);

export type FriendRequestSchemaType = InferSchemaType<typeof FriendRequestSchema>;

const FriendRequest = model<FriendRequestSchemaType>(
  "FriendRequest",
  FriendRequestSchema
);

export default FriendRequest;