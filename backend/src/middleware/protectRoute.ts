import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { Authtoken } from "../types/auth.js";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. No token provided.",
      });
    }

    let decoded: Authtoken;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as Authtoken;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (!decoded?.userID) {
      return res.status(401).json({
        success: false,
        message: "Token payload invalid",
      });
    }

    const user = await User.findById(decoded.userID).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    console.log("Authenticated user:", user.username);

    next();
  } catch (error) {
    console.error("ProtectRoute error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
