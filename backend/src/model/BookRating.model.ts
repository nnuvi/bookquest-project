import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

const BookRatingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      index: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent multiple ratings by same user for same book
BookRatingSchema.index({ user: 1, book: 1 }, { unique: true });

export type BookRatingSchemaType = InferSchemaType<typeof BookRatingSchema>;

const BookRating = model<BookRatingSchemaType>(
  "BookRating",
  BookRatingSchema
);

export default BookRating;