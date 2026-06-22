import { Request, Response } from "express";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/generateToken.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(400).json({ message: "Username exists" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    generateTokenAndSetCookie(newUser._id.toString(), res);

    res.status(201).json({
      message: "User created",
      user: {
        _id: newUser._id.toString(),
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        friends: newUser.friends,
        profileImg: newUser.profileImg,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Signup error",
      error: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    console.log(req.body.username);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username" });
    }
    const isValidPassword = await bcrypt.compare(
      password,
      user?.password || "",
    );
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    generateTokenAndSetCookie(user._id.toString(), res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      friends: user.friends,
      profileImg: user.profileImg,
    });
  } catch (error: any) {
    console.log("Error login controller", error.message);
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log("Error logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error: any) {
    console.log("Error get me controller", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
