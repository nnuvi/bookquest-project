import User from "../../model/userModel.js";
export const userNF = async () => {
     const userId = req.user._id.toString();
     const user = await User.findById(userId);
     if(!user) return res.status(400).json({message: "User not Found"});
}
     