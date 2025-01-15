import express from 'express';
import upload from '../middleware/multer.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { manualImport, isbnImport, imageImport, getMyBooks, getUserBookList, approveDeclineBorrowBook, 
     getBookDetails, borrowedBooks, lentBooks, borrowBook, returnBook, borrowBookRequest } from '../controller/bookController.js';


const router = express.Router();

router.get("/myBooks",protectRoute, getMyBooks);
router.get("/:id/bookList",protectRoute, getUserBookList);
router.get("/viewBook/:id",protectRoute, getBookDetails);
router.get("/borrowedBooks", protectRoute, borrowedBooks);
router.get("/lentBooks", protectRoute, lentBooks);
router.post("/:profileUserId/borrowBook/:bookId", protectRoute, borrowBook);
router.put("/approveDecline/",protectRoute, approveDeclineBorrowBook);
router.put("/returnBook/",protectRoute, returnBook);
//router.post("/lendBook", protectRoute, lendBook);
//router.get("/searchBooks",protectRoute, editProfile);
router.post("/importBooksByISBN",protectRoute, isbnImport);
router.post("/importBooksByImage",protectRoute, upload.single('image'), imageImport);
router.post("/importBooksManually",protectRoute, manualImport);
router.post("/:profileUserId/bookRequest/:bookId", protectRoute, borrowBookRequest);





export default router;