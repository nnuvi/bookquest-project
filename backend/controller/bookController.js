import User from "../model/userModel.js";
import Books from "../model/bookModel.js";
import Tesseract from "tesseract.js";
import Notification from "../model/notificationModel.js";
//import { preprocessImage } from "../lib/util/preProcessImage.js";

export const manualImport = async (req, res) => {
     try {
          const { title, author, genre, publisher, publicationDate, pageCount, description } = req.body;

          const userId = req.user._id.toString();
          console.log( req.user );
          const user = await User.findById(userId);
          console.log("user : ",user );
          if(!user) return res.status(400).json({message: "User not Found"});

          if(!title) return res.status(400).json({ message: "Need a title for the Book" });

          const userBook = await User.findById(userId)
           .populate('bookCollection', 'title')  // Only populate the 'title' of each book
           .exec(); // Executes the query

          if (!userBook) {
            console.log('User not found');
            return [];
          }
          const bookTitles = userBook.bookCollection.map(book => book.title);
          console.log("bookTitles",bookTitles);

          if(bookTitles.includes(title)) {
               return res.status(400).json({ message: "Book already exist" });
          }
          console.log("Here");
          if(!author) return res.status(400).json({ message: "Add an Author for the Book" });
          console.log("Here2");
          if(!genre) return res.status(400).json({ message: "Add genre for the Book" });

          const newBook = new Books({
               title,
               author,
               genre,
               publisher,
               publicationDate, 
               pageCount, 
               description,
          });
          
          await newBook.save();
          user.bookCollection.push(newBook._id);
          await user.save();
          console.log(newBook);
          res.status(201).json({ message: "Book Added Successfully" });

     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }
}

export const isbnImport = async (req, res) => {
     
     try {
          const { isbn } = req.body;
          const userId = req.user._id.toString();

          console.log( req.user );

          const user = await User.findById(userId);
          if(!user) return res.status(400).json({message: "User not Found"});

          const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

          const book = await fetch(url);
          const data = await book.json();
          console.log( "data: ", data );

          const bookData = data.items[0].volumeInfo;
          console.log( bookData);
          console.log('Title:', bookData.title);
          
          if (!bookData) {
               return res.status(404).json({ message: "No book found for this ISBN" });
          }
  
          if (!bookData) {
               return res.status(400).json({ message: "No book found for this ISBN" });
          }

          const existTitle = await Books.findOne({  title: bookData.title });
          console.log(existTitle);

          if(existTitle) {
               return res.status(400).json({ message: "Book already exist" });
          }

          const newBook = new Books({
               title: bookData.title,
               author: bookData.authors,
               genre: bookData.categories,
               publisher: bookData.publisher,
               publicationDate: bookData.publishedDate,
               pageCount: bookData.pageCount,
               description: bookData.description,
               isbn: isbn,
          });
          await newBook.save();
          user.bookCollection.push(newBook._id);
          await user.save();
          console.log(newBook);
          res.status(201).json({ message: "Book Added Successfully" });

     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }
}

import path from "path";
import {ImageAnnotatorClient} from '@google-cloud/vision';
import { fileURLToPath } from 'url';

export const imageImport = async (req, res) => {
     try {
          /*
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const client = new ImageAnnotatorClient({
               keyFilename: "D:/PJ/UNIPRO/wide-empire-443002-m6-0b1e3f325ec9.json", // Path to your JSON key file
          });*/
          


          if (!req.file) {
              return res.status(400).json({ message: 'No file uploaded' });
          }
          console.log('req file:', req.file);
         
             // Access the uploaded file
          /*const uploadedFilePath = path.join(__dirname, 'uploads', req.file.filename);
          console.log('Uploaded file:', uploadedFilePath);*/

          const userId = req.user._id.toString();
          const user = await User.findById(userId);
          if(!user) return res.status(400).json({message: "User not Found"});  

          const buffer = req.file.buffer;

          console.log('Buffer length:', buffer.length);
          console.log("buffer", buffer);

              // Convert buffer to Base64
    const base64Image = buffer.toString('base64');

    // OCR.space API request
    const ocrApiUrl = 'https://api.ocr.space/parse/image';
    const apiKey = 'K84770420488957'; // Replace with your OCR.space API key

    const response = await fetch(
      ocrApiUrl,
      {
        base64Image: `data:image/png;base64,${base64Image}`,
        language: 'eng',
        isOverlayRequired: false,
      },
      {
        headers: {
          apikey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    const ocrResult = response.data;

    if (!ocrResult.IsErroredOnProcessing && ocrResult.ParsedResults.length > 0) {
      const extractedText = ocrResult.ParsedResults[0].ParsedText;
      console.log('Extracted Text:', extractedText);

      return res.status(201).json({ message: 'Text extracted successfully', data: extractedText });
    } else {
      console.error('OCR API Error:', ocrResult.ErrorMessage || 'Unknown error');
      return res.status(500).json({ message: 'Failed to extract text from image', error: ocrResult.ErrorMessage });
    }

          //const preprocessedBuffer = await preprocessImage(buffer);
/*
          const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
            logger: (m) => console.log(m),
            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            oem: 3,
            psm: 6
          });*/

          //const [result] = await client.textDetection({ image: { content: buffer } });
          //const text = result.textAnnotations[0]?.description || '';
      /*
          if (!text) {
            return res.status(404).json({ message: 'No text found in the image' });
          }

          console.log('Extracted Text:', text);

          res.status(201).json({ message: "Book Added Successfully", data: text });*/

     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }

}

export const getMyBooks = async (req, res) => {
     try {
          const userId = req.user._id.toString();
          console.log( req.user );
          const user = await User.findById(userId);
          if(!user) return res.status(400).json({message: "User not Found"});

          const getUserBookList = await User.findById(userId).populate('bookCollection').exec();
          console.log("getUserBookList", getUserBookList);
          
          res.status(200).json(getUserBookList);
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }
}

export const getUserBookList = async (req, res) => {
     try {
          const userId = req.user._id.toString();
          const profileUserId = req.params.id;

          console.log("User ID from req.user:", userId);
          console.log("Profile ID from params:", profileUserId);

          const user = await User.findById(userId);
          //console.log("user : ",user );
          if(!user) return res.status(400).json({message: "User not Found"});

          const getUserBookList = await User.findById(profileUserId)
          .select('bookCollection')
          .populate('bookCollection')
          .exec();
          console.log("getUserBookList", getUserBookList);

          res.status(200).json(getUserBookList);
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }
}

export const getBookDetails = async (req, res) => {
     try {
          const userId = req.user._id.toString();
          console.log( req.user );
          const bookId = req.params.id;
          console.log( bookId  );
          const user = await User.findById(userId);
          console.log("user : ",user );
          if(!user) return res.status(400).json({message: "User not Found"});

          const bookDetails = await Books.findById(bookId);
          console.log("get book details", bookDetails);

          res.status(200).json(bookDetails);
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }
}

export const borrowedBooks = async (req, res) => {
     try {
          const userId = req.user._id.toString();
          console.log( req.user );
          const user = await User.findById(userId);
          if(!user) return res.status(400).json({message: "User not Found"});

          const getUserBookList = await User.findById(userId)
          .select('bookCollection')
          .populate('bookCollection')
          .exec();
          console.log("getUserBookList", getUserBookList);

          console.log("Populated bookCollection:", getUserBookList.bookCollection);

          const borrowedBookList = getUserBookList.bookCollection.filter(book => book.bookType === 'borrowedBook');
          console.log("bookTitles", borrowedBookList);

          getUserBookList.bookCollection.forEach(book => {
               console.log('bookTypes', book.bookType);
          });
          
          res.status(200).json(borrowedBookList);
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }
}

export const lentBooks = async (req, res) => {
     try {
          const userId = req.user._id.toString();
          console.log( req.user );
          const user = await User.findById(userId);
          if(!user) return res.status(400).json({message: "User not Found"});

          const getUserBookList = await User.findById(userId)
          .select('bookCollection')
          .populate('bookCollection')
          .exec();
          console.log("getUserBookList", getUserBookList);

          console.log("Populated bookCollection:", getUserBookList.bookCollection);

          const lentBookList = getUserBookList.bookCollection.filter(book => book.bookType === ('lent' || 'lentBook'));
          console.log("bookTitles", lentBookList);

          getUserBookList.bookCollection.forEach(book => {
               console.log('bookTypes', book.bookType);
          });
          
          res.status(200).json(lentBookList);
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }
}

export const borrowBook = async (req, res) => {
     try {
          const userId = req.user._id.toString(); //user id
          console.log( req.user );
          const { profileUserId, bookId } = req.params; //profile and book id

          console.log(" profileUserId :", profileUserId );
          console.log(" bookId :", bookId );
          const { title, author, genre } = req.body;
          const user = await User.findById(userId); //get loggedit user 
          console.log("user : ", user );
          if(!user) return res.status(400).json({message: "User not Found"});
          const profileUser = await User.findById(profileUserId); //get visiting profile id
          console.log( "profileUser:", profileUser );
          const book = await Books.findById(bookId); //get the book 
          console.log( "book:", book );

          const isAlreadyBookExist = await user.bookCollection.includes(bookId); //book exists
          console.log("isAlreadyBookExist:", isAlreadyBookExist);
          if(isAlreadyBookExist) {
               return res.status(400).json({ message: "Book already exist" });
          }

          console.log("book.title, book.author", book.title, book.author);
          const notification = new Notification({
               from: user._id,
               to: profileUser._id,
               message: `${user.fullName} Requested to Borrow the book ${book.title} by ${book.author} from you`,
               type: 'bookRequest',
               book: bookId,
          });
          console.log("notification:", notification);
          await notification.save();
          console.log("notification saved");
          res.status(200).json({ message: "request to borrow book successful!!!"});

     } catch (error) {
          console.log("error:", error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }
}

export const approveDeclineBorrowBook = async (req, res) => {
     try {
          const userId = req.user._id.toString(); //user id
          const {action, notificationId }  = req.body;
          console.log('res action: ', action, notificationId);

          const notification = await Notification.findById(notificationId);
          if (!notification) return res.status(404).json({ message: "Notification not found" });
  
          const { from: borrowerId, book } = notification; // Borrower and book details
          const borrower = await User.findById(borrowerId);
          const bookDetails = await Books.findById(book);
          console.log("borrowerId, bookId", borrowerId, book);


          console.log("book._id", book);
          if(action === "approved"){
               if (!borrower || !bookDetails) return res.status(404).json({ message: "User or Book not found" });

               const isAlreadyBookExist = await borrower.bookCollection.includes(book); //book exists
               console.log("isAlreadyBookExist:", isAlreadyBookExist);
               if(isAlreadyBookExist) {
                    return res.status(400).json({ message: "Book already exist" });
               }
               const newBookAsBorrowedBook = new Books({
                    title: bookDetails.title,
                    author: bookDetails.author,
                    genre: bookDetails.genre,
                    borrowedBookId: book._id,
                    bookAdded: new Date(),
                    publisher: bookDetails.publisher,
                    publicationDate: bookDetails.publicationDate, 
                    pageCount: bookDetails.publicationDate, 
                    description: bookDetails.description,
                    bookType: "borrowedBook",
               });
               console.log("newBookAsBorrowedBook:", newBookAsBorrowedBook);
               await newBookAsBorrowedBook.save();
               
               console.log("newBookAsBorrowedBook:", newBookAsBorrowedBook);
               borrower.bookCollection.push(newBookAsBorrowedBook);

               await borrower.save();
               /*borrower.bookCollection.push({
                    ...bookDetails.toObject(), // Copy the book's data
                    bookType: "borrowedBook", // Add or overwrite the field
                    borrowedBookId: book._id // Reference to the original book ID
               });*/
               

            notification.message = `Request Approved to borrow the Book ${bookDetails.title} by ${bookDetails.author}`
            notification.type = "action";
            await notification.save();
            const borrowedUserNotification = new Notification({
               from: userId,
               to: borrowerId,
               message: `Your request to borrow the book ${bookDetails.title} by ${borrower.fullName} has been approved`,
               type: "action"
            });
            await borrowedUserNotification.save();
            res.status(200).json({ message: "Request Approved to borrow the Book" });
          }
          else if(action === "declined"){
               notification.message = `Request Declined to borrow the Book ${bookDetails.title} by ${bookDetails.author}`
               notification.type = "action";
               await notification.save();
               const declinedUserNotification = new Notification({
                    from: userId,
                    to: borrowerId,
                    message: `Your request to borrow the book ${bookDetails.title} by ${borrower.fullName} has been declined`,
                    type: "action",
               });
               await declinedUserNotification.save();
               res.status(200).json({ message: "Request Declined to borrow the Book" });
          }
          else if(action === "return"){


              /* const book = await Book.findById(bookId);
               const bookDetails = await Book.findById(bookId).populate("author");
               const borrower = await User.findById(borrowerId);
               const borrowedBook = await BorrowedBook.findOne({bookId: bookId, userId: borrowerId}).populate("bookId").populate("userId");
                    if(borrowedBook){
                         borrowedBook.returnDate = new Date();
                         await borrowedBook.save();}*/

          }
     } catch (error) {
          console.log("error:", error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }

}

export const returnBook = async (req, res) => {
     try {
          const userId = req.user.id;
          const user = await User.findById(userId);
          if(!user) return res.status(400).json({message: "User not Found"});

          const {bookId} = req.body;
          const bookInfo = await Books.findById(bookId);
          if (!bookInfo) return res.status(400).json({ message: "Book not Found" });

          const borrowedFromUser = await User.findOne({
               "bookCollection": bookInfo.borrowedBookId,
          });
          console.log("borrowedFromUser:", borrowedFromUser); 
          if(!borrowedFromUser) return res.status(400).json({message: " BUser not Found"});

          console.log("borrowedFromUser", borrowedFromUser);
          await User.findByIdAndUpdate(userId, 
               {$pull:  {bookCollection: bookId}}, 
          );
          console.log(" after borrowedFromUser");
          const returendNotification = new Notification({
               from: userId,
               to: borrowedFromUser._id,
               message: `${user.fullName} returned the book ${bookInfo.title} by ${bookInfo.author}`,
               type: "action",
          });
          await returendNotification.save();
          console.log("after returendNotification");
          console.log(" after ", returendNotification);
          res.status(200).json({ message: "Returned the Book" });
     } catch (error) {
          console.log("error:", error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }
}