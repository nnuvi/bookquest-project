import User from "../model/userModel.js";
import Books from "../model/bookModel.js";
import Tesseract from "tesseract.js";
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

          const existTitle = await Books.findOne({ title });
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

export const imageImport = async (req, res) => {
     try {
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

          //const preprocessedBuffer = await preprocessImage(buffer);

          const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
            logger: (m) => console.log(m),
            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            oem: 3,
            psm: 6
          });
          console.log('Extracted Text:', text);

          res.status(201).json({ message: "Book Added Successfully", data: text });

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
          console.log( req.user );
          const profileUserId = req.params.id;
          console.log( profileUserId  );
          const user = await User.findById(userId);
          console.log("user : ",user );
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
          const userId = req.user._id.toString();
          console.log( req.user );
          const { profileUserId, bookId } = req.params;

          console.log(" profileUserId :", profileUserId );
          console.log(" bookId :", bookId );
          const { title, author, genre } = req.body;
          const user = await User.findById(userId);
          console.log("user : ", user );
          if(!user) return res.status(400).json({message: "User not Found"});
          const profileUser = await User.findById(profileUserId);
          console.log( "profileUser:", profileUser );
          const book = await Books.findById(bookId);
          console.log( "book:", book );

          const isAlreadyBookExist = await user.bookCollection.includes(bookId);
          console.log("isAlreadyBookExist:", isAlreadyBookExist);
          if(isAlreadyBookExist) {
               return res.status(400).json({ message: "Book already exist" });
          }

          const userBook = await User.findById(userId)
          .populate('bookCollection', 'title')  // Only populate the 'title' of each book
          .exec(); // Executes the query

         if (!userBook) {
           console.log('User not found');
           return [];
         }
         const bookTitles = userBook.bookCollection.map(book => book.title);
         console.log("bookTitles",bookTitles);

         const bookExists = bookTitles.includes(title);
         console.log("bookExists",bookExists);

         if(bookExists) {
              return res.status(400).json({ message: "Book already exist" });
         }

         if(!bookExists) {
  /*        const updateBookForUser = await Books.findByIdAndUpdate(
               bookId, 
               { $set: { bookType: 'borrowed' } }, 
               { new: true }
          );
          console.log("updateBookForUser:", updateBookForUser);
          user.bookCollection.push(bookId);
          await user.save();
 */

          // Step 2: Create a new book entry with a different `bookType`
          const newBorrowedBook = new Books({
               ...originalBook.toObject(), // Copy all fields from the original book
               _id: mongoose.Types.ObjectId(), // Generate a new ID
               bookType: 'borrowedBook', // Set to 'borrowed' for the borrowing user
          });
          
          // Save the new book document
          const savedBorrowedBook = await newBorrowedBook.save();
          console.log("New Borrowed Book:", savedBorrowedBook);
          
          // Step 3: Add the new book ID to the borrower's collection
          user.bookCollection.push(savedBorrowedBook._id);
          await user.save();
          
          const updateBookForProfileUser = await Books.findByIdAndUpdate(
               bookId, 
               { $set: { bookType: 'lentBook' } }, 
               { new: true }
          );
          console.log("updateBookForProfileUser:", updateBookForProfileUser);
          profileUser.bookCollection.push(bookId);
          await profileUser.save();
         }
         res.status(200).json({ message: "borrowed successful!!!"});

     } catch (error) {
          console.log("error:", error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
     }

}
