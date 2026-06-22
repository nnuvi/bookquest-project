import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const UserRoleEnum = ["admin", "user"] as const;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
      trim: true,
    },

    role: {
      type: String,
      enum: UserRoleEnum,
      default: "user",
    },

    // userBooks: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "UserBook",
    //     default: [],
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

export type UserSchemaType = InferSchemaType<typeof UserSchema>;

const User = model<UserSchemaType>("User", UserSchema);

export default User;