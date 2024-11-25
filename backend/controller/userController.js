import User from "../model/userModel.js";
import { protectRoute } from "../middleware/protectRoute.js";
import Notification from "../model/notificationModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from 'bcryptjs';




export const getUserProfile = async (req, res) => {
     try {
          const { id } = req.params;
          console.log("id: ", id);
          const user = await User.findById(id).select("-password");
          console.log(user);
          if (!user) {
               return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
     } catch (err) {
          res.status(500).json({ error: 'Error fetching user profile' });
          console.log("Error in get userProfile function");
     }
}

export const editProfile = async (req, res) => {
     const { fullName, username, email, currentPassword, newPassword, bio } = req.body;
     let { profileImg, coverImg } = req.body;

     const userId = req.user._id;

     try{
          let user = await User.findById(userId);
          if (!user) {
               return res.status(404).json({ message: "User not found" });
          }
          if ((!currentPassword && newPassword) || (!currentPassword && !newPassword)) {
               return res.status(400).json({ error: "Please enter current password or new password"})
          }
          if (currentPassword && newPassword) {
               const isValidPassword = await bcrypt.compare(currentPassword, user.password);
               if (!isValidPassword) {
                    return res.status(401).json({ error: "Invalid current password" });
               }
               if(newPassword.length < 6){
                    return res.status(400).json({ message: "Password must be at least 6 characters long"});
               }
          }
          if(newPassword){
               const salt = await bcrypt.genSalt(10);
               const hashedPassword = await bcrypt.hash(newPassword, salt);
          }

          if(profileImg){

          }
     
          user.fullName = fullName || user.fullName;
          user.username = username || user.username;
          user.email = email || user.email;
          user.bio = bio || user.bio;
          user.profileImg = profileImg || user.profileImg;

          await user.save();
          user.password = null;

          res.status(200).json({ message: "Profile updated successfully" });
     } catch (error) {
          console.log("Error in updateProfile: ", error.message);
          res.status(500).json({ error: error.message });
     }
          
}

export const friendsRequestSendUnsend = async (req, res) => {
     try {
          const userId = req.user._id.toString();
          console.log( req.user );
          const user = await User.findById(userId);
          if(!user) return res.status(400).json({message: "User not Found"});
          const friendId = req.params.id;
          const friend = await User.findById(friendId);
          if(!friend) return res.status(400).json({message: "Friend not Found"});
          const friendExists = await user.friends.includes(friendId);
         /* if(friendExists) {
               /*user.friendList = user.friendList.filter(id => id.toString() !== friendId.toString());
               await user.save();
               return res.status(200).json({ message: "Friend exists" });
          } */
          if (!friendExists) {
               user.friends.push(friendId);
               friend.friends.push(user._id);
               await user.save();
               await friend.save();

               /*const newNotification = new Notification({
                    type: "follow",
                    from: req.user._id,
                    to: userToModify._id
               });
               await newNotification.save();*/
               console.log("user after friendedunfriended:", user );
               res.status(200).json({ message: "Friended successful!!!"});
          }
          else {
               await User.findByIdAndUpdate( friendId, { $pull: { friends: req.user._id}});
               await User.findByIdAndUpdate(req.user._id, { $pull: { friends: friendId}});
               res.status(200).json({ message : "Unfriended" });
          }
              /* const friendRequest = await FriendRequest.findOne({from: userId, to: friendId});
               if(!friendRequest) return res.status(400).json({message: "Friend Request not
                    Found"});
                    if(friendRequest.status === "pending"){
                         await FriendRequest.updateOne({from: userId, to: friendId}, {status: "
                              return res.status(200).json({message: "Friend Request sent successfully"});
                              }
                              if(friendRequest.status === "sent"){
                                   await FriendRequest.updateOne({from: userId, to: friendId}, {status: "
                                        return res.status(200).json({message: "Friend Request unsent successfully"});
                                        } catch (error) {
                                             console.log("Error in friendsRequestSendUnsend: ", error.message);
                                             res.status(500).json({ error: error.message });
                                        }*/
     } catch (error) {
          console.log("Error in friendsRequestSendUnsend: ", error.message);
          res.status(500).json({ message: "Error in friendsRequestSendUnsend: ", error: error.message });
     }

}

export const friendList = async (req, res) => {
     try {
          const userId = req.user._id.toString();
          console.log( req.user );
          const user = await User.findById(userId);
          if(!user) return res.status(400).json({message: "User not Found"});

          const friends = await User.find({ _id: { $in: user.friends } });
          console.log(friends);
          res.status(200).json(friends);
     } catch (error) {
          console.log("Error in friendList: ", error.message);
          res.status(500).json({menubar: "Error in friendList: ", error: error.message });
     }

}

export const searchProfile = async (req, res) => {
     try {
          const search = req.query.q;
          console.log(search);
          const users = await User.find({ $or: [ 
               { username: { $regex: search, $options: "i" } },
          ] });
          console.log(users);
          res.status(200).json(users);
     } catch (error) {
          console.log("Error in Search: ", error.message);
          res.status(500).json({message: "Error in search: ", error: error.message });
     }
}