import type { Request, Response } from "express";
import User from "../model/user.model.js";
import { protectRoute } from "../middleware/protectRoute.js";
import Notification from "../model/notification.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id: ", id);
  const user = await User.findById(id).select("-password");
  console.log("auth user");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
};

export const editProfile = async (req: Request, res: Response) => {
  const { fullName, username, email, currentPassword, newPassword, bio } =
    req.body;
  let { profileImg, coverImg } = req.body;

  const userId = req.user._id;

  let user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if ((!currentPassword && newPassword) || (!currentPassword && !newPassword)) {
    return res
      .status(400)
      .json({ error: "Please enter current password or new password" });
  }
  if (currentPassword && newPassword) {
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid current password" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
  }
  if (newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
  }

  user.fullName = fullName || user.fullName;
  user.username = username || user.username;
  user.email = email || user.email;
  user.bio = bio || user.bio;
  user.profileImg = profileImg || user.profileImg;

  await user.save();
  //   user.password = null;

  res.status(200).json({ message: "Profile updated successfully" });
};

export const friendsRequestSendUnsend = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const friendId = req.params.id;

  if (!friendId) {
    return res.status(400).json({ message: "Friend ID missing" });
  }

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (!user || !friend) {
    return res.status(404).json({ message: "User not found" });
  }

  const friendExists = user.friends
    .map((id) => id.toString())
    .includes(friendId);

  if (!friendExists) {
    user.friends.push(friend._id);
    friend.friends.push(user._id);

    await user.save();
    await friend.save();

    return res.status(200).json({ message: "Friend added" });
  } else {
    await User.findByIdAndUpdate(userId, {
      $pull: { friends: friendId },
    });

    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: userId },
    });

    return res.status(200).json({ message: "Friend removed" });
  }
};

export const friendList = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  //console.log( req.user );
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const friends = await User.find({ _id: { $in: user.friends } });
  console.log(friends);
  res.status(200).json(friends);
};

export const searchProfile = async (req: Request, res: Response) => {
  const search = req.query.q;
  console.log(search);
  const users = await User.find({
    $or: [{ username: { $regex: search, $options: "i" } }],
  });
  console.log(users);
  res.status(200).json(users);
};
