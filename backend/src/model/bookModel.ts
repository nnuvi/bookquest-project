import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const BookTypeEnum = ["myBook", "borrowedBook", "lentBook"] as const;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },

    author: {
      type: [String],
      required: true,
    },

    genre: {
      type: [String],
      required: true,
    },

    publisher: {
      type: String,
      default: "",
    },

    publicationDate: {
      type: Date,
      default: null,
    },

    pageCount: {
      type: Number,
      default: null,
    },

    description: {
      type: String,
      default: "",
    },

    isbn: {
      type: String,
      default: "",
      unique: true,
      maxlength: 13,
      trim: true,
    },

    bookType: {
      type: String,
      enum: BookTypeEnum,
      default: "myBook",
    },

    bookAdded: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export type BookSchemaType = InferSchemaType<typeof BookSchema>;

const Books = model<BookSchemaType>("Books", BookSchema);

export default Books;