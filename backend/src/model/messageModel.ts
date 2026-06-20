import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

const MessageSchema = new Schema(
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

    message: {
      type: String,
      required: true,
    },

    sentTime: {
      type: Date,
      default: Date.now,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export type MessageSchemaType = InferSchemaType<typeof MessageSchema>;

const Message = model<MessageSchemaType>("Message", MessageSchema);

export default Message;