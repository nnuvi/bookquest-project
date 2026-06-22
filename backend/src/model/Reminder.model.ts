import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const ReminderEventEnum = [
  "reminder.due_date",
  "reminder.overdue",
  "reminder.return_due",
  "reminder.borrow_followup",
] as const;

const ReminderSchema = new Schema(
  {
    user: {
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

    borrowRecord: {
      type: Schema.Types.ObjectId,
      ref: "BorrowRecord",
      default: null,
    },

    event: {
      type: String,
      enum: ReminderEventEnum,
      default: "reminder.due_date",
      index: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    remindAt: {
      type: Date,
      required: true,
      index: true,
    },

    isSent: {
      type: Boolean,
      default: false,
      index: true,
    },

    sentAt: {
      type: Date,
      default: null,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export type ReminderSchemaType = InferSchemaType<typeof ReminderSchema>;

const Reminder = model<ReminderSchemaType>("Reminder", ReminderSchema);

export default Reminder;
