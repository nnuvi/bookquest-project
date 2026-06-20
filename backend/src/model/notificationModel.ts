import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const NotificationTypeEnum = ["reminder", "request", "follow", "action"] as const;
export const NotificationRequestEnum = ["approved", "declined"] as const;

const NotificationSchema = new Schema(
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

    type: {
      type: String,
      enum: NotificationTypeEnum,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },

    message: {
      type: String,
      required: true,
    },

    request: {
      type: String,
      enum: NotificationRequestEnum,
    },

    book: {
      type: Schema.Types.ObjectId,
      ref: "Books",
    },
  },
  { timestamps: true }
);

export type NotificationSchemaType = InferSchemaType<typeof NotificationSchema>;

const Notification = model<NotificationSchemaType>(
  "Notification",
  NotificationSchema
);

export default Notification;