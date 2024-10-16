import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/util/generateToken.js";

export const signup = async (req, res) => {
     try {
          const {fullName, username, email, password} = req.body;

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
               return res.status(400).json({ message: "Invalid email address" });
          }

          const existUser = await User.findOne({ username });
          if (existUser) {
               return res.status(400).json({ message: "Username already exists" });
          }

          const existEmail = await User.findOne({ email });
          if (existEmail) {
               return res.status(400).json({ message: "Email already exists" });
          }

          if (password.length < 6) {
               return res.status(400).json({ message: "Password must be at least 6 characters long" });
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newUser = new User({
               fullName,
               username,
               email,
               password: hashedPassword
          });

          if(newUser){
               generateTokenAndSetCookie(newUser._id, res);
               const savedUser = await newUser.save();
               res.status(201).json({ 
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    email: newUser.email,
                    followers: newUser.followers,
                    following: newUser.following,
                    profileImg: newUser.profileImg,
                    coverImg: newUser.coverImg,
                    message: "User created successfully", savedUser });
          }
          else{
               return res.status(400).json({ message: "Failed to create user" });
          }
          } catch (error) {
               res.status(500).json({message: 'Error creating user', error: error.message});
          }
};

export const login = async (req, res) => {
     try {
          const { username, password } = req.body;

          console.log( req.body.username);
                 
          const user = await User.findOne({ username });
          if (!user) {
               return res.status(400).json({ message: "Invalid username" });
          }
          const isValidPassword = await bcrypt.compare(password, user?.password || "");
          if (!isValidPassword) {
               return res.status(400).json({ message: "Invalid password" });
          }

          generateTokenAndSetCookie(user._id, res);

          res.status(200).json({
               _id: user._id,
               fullName: user.fullName,
               username: user.username,
               email: user.email,
               followers: user.followers,
               following: user.following,
               profileImg: user.profileImg,
               coverImg: user.coverImg
          });

     }
     catch(error) {
          console.log("Error login controller", error.message);
          res.status(500).json({message: 'Error logging in user', error: error.message});
     }
};

export const logout = async (req, res) => {
     try {
          res.cookie("jwt", "", {maxAge:0})
          res.clearCookie('token');
          res.status(200).json({ message: "Logged out successfully" });
     }
     catch(error) {
          console.log("Error logout controller", error.message);
          res.status(500).json({ error : "Internal Server Error!" });
     }
};

export const getMe = async (req, res) => {
     try {
          const user = await User.findById(req.user._id).select("-password");
          res.status(200).json(user);
     }
     catch (error) {
          console.log("Error get me controller", error.message);
     }
}

