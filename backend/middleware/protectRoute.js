import jwt from 'jsonwebtoken';
import User from "../model/userModel.js";

export const protectRoute = async (req, res, next) => {
     try {
          const token = req.cookies.jwt;
          if (!token) {
               return res.status(401).json({ message: "You are not logged in" });
          }

          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          console.log('decoded');

          if(!decoded) {
               return res.status(401).json( { error: "Uncaught Error!"});
          }

          const user = await User.findById(decoded.userID).select("-password");

          console.log('pr user: ',user.username);

          if(!user) {
               return res.status(404).json({ error: "User not Found" });
          }

          req.user = user;
          next();
     }

     catch (error) {
          console.error("Error in protectRoute middleware", error);
          return res.status(401).json({ message: "Unauthorized access" });
     }
};