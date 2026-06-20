import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const ReminderTypeEnum = ["borrow", "lent"] as const;

const ReminderSchema = new Schema(
  {
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
      enum: ReminderTypeEnum,
      required: true,
    },

    daysPassed: {
      type: Date,
      default: Date.now,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export type ReminderSchemaType = InferSchemaType<typeof ReminderSchema>;

const Reminder = model<ReminderSchemaType>("Reminder", ReminderSchema);

export default Reminder;