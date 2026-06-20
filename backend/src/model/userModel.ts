import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const UserRoleEnum = ["admin", "user"] as const;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    profileImg: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: UserRoleEnum,
      default: "user",
    },

    bookCollection: [
      {
        type: Schema.Types.ObjectId,
        ref: "Books",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export type UserSchemaType = InferSchemaType<typeof UserSchema>;

const User = model<UserSchemaType>("User", UserSchema);

export default User;