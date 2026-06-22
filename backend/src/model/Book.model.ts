import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: [String],
      required: true,
    },

    isbn: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    publisher: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

export type BookSchemaType = InferSchemaType<typeof BookSchema>;

const Book = model<BookSchemaType>("Book", BookSchema);

export default Book;
