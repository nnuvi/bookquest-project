import type { Request, Response } from "express";
import User from "../../src/model/userModel.js";
import Books from "../../src/model/bookModel.js";

export const verifyIfUserExist = async (res: Response, userId: string) => {
     const user = await User.findById(userId);
     if (!user) return res.status(400).json({ message: "User not Found" });
     return user;
}

export const verifyIfBookExist = async (res: Response, bookId: string) => {
     const book = await Books.findById(bookId);
     if (!book) return res.status(400).json({ message: "Book not Found" });
     return book;
}
