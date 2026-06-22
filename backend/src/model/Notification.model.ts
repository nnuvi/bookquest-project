import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const NotificationEventEnum = [
  // Borrow system
  "borrow.request.sent",
  "borrow.request.approved",
  "borrow.request.declined",

  // Book actions
  "book.added.manual",
  "book.added.isbn",
  "book.added.scan",
  "book.returned",

  // Status
  "book.overdue",

  // Social
  "friend.request.sent",
  "friend.request.accepted",

  // System
  "system.message",
] as const;

const NotificationSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null, // system notifications may not have sender
    },

    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    event: {
      type: String,
      enum: NotificationEventEnum,
      required: true,
      index: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      default: null,
    },

    userBook: {
      type: Schema.Types.ObjectId,
      ref: "UserBook",
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export type NotificationSchemaType = InferSchemaType<typeof NotificationSchema>;

const Notification = model<NotificationSchemaType>(
  "Notification",
  NotificationSchema,
);

export default Notification;
