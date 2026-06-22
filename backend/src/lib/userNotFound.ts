import type { Response } from "express";
import User from "../model/user.model.js";
export const userNF = async (res: Response, userId: string) => {
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });
};
