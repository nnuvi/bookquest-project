import User from "../../model/userModel.js";
import Books from "../../model/bookModel.js";

export const verifyIfUserExist = async(res, userId) => {
     const user = await User.findById(userId);
     if(!user) return res.status(400).json({message: "User not Found"});
     return user;
}

export const verifyIfBookExist = async(res, bookId) => {
     const book = await Books.findById(bookId);
     if(!book) return res.status(400).json({message: "Book not Found"});
     return book;
}
