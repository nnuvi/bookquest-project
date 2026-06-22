import { Request, Response } from "express";
import User from "../model/user.model.js";
import Books, { BookSchemaType } from "../model/book.model.js";
import Notification from "../model/notificationModel.js";
import BookRequest from "../model/bookRequestModel.js";
import BorrowBooks from "../model/borrowLendModel.js";
import { verifyIfUserExist, verifyIfBookExist } from "../lib/verify.js";
import Tesseract from "tesseract.js";
import { BookType } from "../types/book.js";
import { BorrowBookType } from "../types/types.js";

//import { preprocessImage } from "../lib/util/preProcessImage.js";

export const manualImport = async (req: Request, res: Response) => {
  const {
    title,
    author,
    genre,
    publisher,
    publicationDate,
    pageCount,
    description,
  } = req.body;

  const userId = req.user._id.toString();
  console.log(req.user);
  const user = await User.findById(userId);
  console.log("user : ", user);
  if (!user) return res.status(400).json({ message: "User not Found" });

  if (!title)
    return res.status(400).json({ message: "Need a title for the Book" });

  const userBook = await User.findById(userId)
    .populate("bookCollection", "title") // Only populate the 'title' of each book
    .exec(); // Executes the query

  if (!userBook) {
    console.log("User not found");
    return [];
  }
  const bookTitles = userBook.bookCollection.map((book) => book.title);
  console.log("bookTitles", bookTitles);

  if (bookTitles.includes(title)) {
    return res.status(400).json({ message: "Book already exist" });
  }
  console.log("Here");
  if (!author)
    return res.status(400).json({ message: "Add an Author for the Book" });
  console.log("Here2");
  if (!genre)
    return res.status(400).json({ message: "Add genre for the Book" });

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
};

export const isbnImport = async (req: Request, res: Response) => {
  const { isbn } = req.body;
  const userId = req.user._id.toString();
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  const book = await fetch(url);
  const data = await book.json();
  const bookData = data.items[0].volumeInfo;
  console.log(bookData);
  if (!bookData) {
    return res.status(404).json({ message: "No book found for this ISBN" });
  }
  const existTitle = await Books.findOne({ title: bookData.title });
  if (existTitle)
    return res.status(400).json({ message: "Book already exist" });
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
};

export const imageImport = async (req: Request, res: Response) => {
  /*
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const client = new ImageAnnotatorClient({
               keyFilename: "D:/PJ/UNIPRO/wide-empire-443002-m6-0b1e3f325ec9.json", // Path to your JSON key file
          });



          if (!req.file) {
               return res.status(400).json({ message: 'No file uploaded' });
          }
          console.log('req file:', req.file);

          // Access the uploaded file
          /*const uploadedFilePath = path.join(__dirname, 'uploads', req.file.filename);
          console.log('Uploaded file:', uploadedFilePath);*/

  const userId = req.user._id.toString();
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const buffer = req.file.buffer;

  console.log("Buffer length:", buffer.length);
  console.log("buffer", buffer);

  // Convert buffer to Base64
  const base64Image = buffer.toString("base64");

  // OCR.space API request
  const ocrApiUrl = "https://api.ocr.space/parse/image";
  const apiKey = "K84770420488957"; // Replace with your OCR.space API key

  const response = await fetch(ocrApiUrl, {
    method: "POST",
    headers: {
      apikey: apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base64Image: `data:image/png;base64,${base64Image}`,
      language: "eng",
      isOverlayRequired: false,
    }),
  });

  const ocrResult = await response.json();

  if (!ocrResult.IsErroredOnProcessing && ocrResult.ParsedResults.length > 0) {
    const extractedText = ocrResult.ParsedResults[0].ParsedText;
    console.log("Extracted Text:", extractedText);

    return res
      .status(201)
      .json({ message: "Text extracted successfully", data: extractedText });
  } else {
    console.error("OCR API Error:", ocrResult.ErrorMessage || "Unknown error");
    return res.status(500).json({
      message: "Failed to extract text from image",
      error: ocrResult.ErrorMessage,
    });
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
};

export const getMyBooks = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  //console.log( req.user );
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const getUserBookList = await User.findById(userId).populate<{
    bookCollection: BookSchemaType[];
  }>("bookCollection");

  if (!getUserBookList) {
    return res.status(404).json({ message: "User not found" });
  }

  const bookTitles = getUserBookList.bookCollection.map((book) => book.title);
  console.log("Book Titles (mine):", bookTitles);

  res.status(200).json(getUserBookList);
};

export const getUserBookList = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  const profileUserId = req.params.id;

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const getUserBookList = await User.findById(profileUserId)
    .select("bookCollection")
    .populate<{ bookCollection: BookSchemaType[] }>("bookCollection")
    .exec();

  if (!getUserBookList) {
    return res.status(404).json({ message: "Profile user not found" });
  }

  const bookTitles = getUserBookList.bookCollection.map((book) => book.title);
  console.log("Book Titles (user):", bookTitles);

  res.status(200).json(getUserBookList);
};

export const getBookDetails = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  //console.log( req.user );
  const bookId = req.params.id;
  console.log(bookId);
  const user = await User.findById(userId);
  console.log("user : ", user);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const bookDetails = await Books.findById(bookId);
  console.log("get book details", bookDetails);

  res.status(200).json(bookDetails);
};

export const borrowBookRequest = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const bookId = req.params.bookId;
  console.log(bookId);
  const book = await Books.findById(bookId);
  if (!book) return res.status(400).json({ message: "Book not Found" });

  const profileUserId = req.params.profileUserId;
  const profileUser = await User.findById(profileUserId);
  if (!profileUser) return res.status(400).json({ message: "User not Found" });

  const isAlreadyBookExist = user.bookCollection.some(
    (id) => id.toString() === book._id.toString(),
  );
  if (isAlreadyBookExist)
    return res.status(400).json({ message: "Book already exist" });

  const requestSent = await BookRequest.findOne({
    from: userId,
    to: profileUserId,
    bookId: bookId,
    type: "borrow",
  });
  console.log("request sent", requestSent);
  if (requestSent)
    return res.status(400).json({ message: "Request Sent Already." });
  const bookRequest = new BookRequest({
    from: userId,
    to: profileUserId,
    bookId: bookId,
    type: "borrow",
  });
  console.log("book request", bookRequest);
  const notification = new Notification({
    from: user._id,
    to: profileUser._id,
    message: `<b>${user.fullName}</b> Requested to Borrow the book ${book.title} 
                         by ${book.author} from you`,
    type: "request",
    book: bookId,
  });
  console.log("notification", notification);
  await bookRequest.save();
  console.log("book request saved");
  await notification.save();
  console.log("notification saved");
  res.status(200).json({ message: "request to borrow book successful!!!" });
};

export const approveDeclineBorrowRequest = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user._id.toString();
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const { action, notificationId } = req.body;
  const notification = await Notification.findById(notificationId);
  if (!notification)
    return res.status(404).json({ message: "Notification not found" });

  const { from: requestedUserId, book: bookId } = notification;
  const requestedUser = await User.findById(requestedUserId);
  if (!requestedUser)
    return res.status(400).json({ message: "User not Found" });
  const book = await Books.findById(bookId);
  if (!book) return res.status(400).json({ message: "Book not Found" });

  const request = await BookRequest.findOne({
    from: requestedUserId,
    to: userId,
    bookId: bookId,
    type: "borrow",
  });
  if (!request) return res.status(400).json({ message: "Request not Found" });

  if (request.status !== "requested")
    return res.status(400).json({ message: "Request status is not requested" });

  if (action === "approved") {
    const isAlreadyBookExist = requestedUser.bookCollection.some(
      (id) => id.toString() === book._id.toString(),
    );
    if (isAlreadyBookExist) {
      request.status = "declined";
      await request.save();

      const notificationToRequester = new Notification({
        from: user._id,
        to: requestedUser._id, //requester
        message: `Your request to borrow the book ${book.title} from <b>${user.fullName}</b> 
                                   has been declined `,
        bookId: bookId,
        type: "action",
      });
      await notificationToRequester.save();

      notification.message = `Request declined as the other user already has the book`;
      notification.type = "action";
      await notification.save();

      return res
        .status(200)
        .json({ message: "request to borrow book declined!!!" });
    } else {
      request.status = "approved";
      await request.save();

      const borrowBook = new BorrowBooks({
        borrowedFrom: user._id,
        borrowedTo: requestedUser._id,
        bookId: bookId,
        borrowDate: new Date(),
        status: "borrowed",
      });
      await borrowBook.save();

      const notificationToRequester = new Notification({
        from: user._id,
        to: requestedUser._id,
        message: `Your request to borrow the book ${book.title} from <b>${user.fullName}</b> has been approved`,
        bookId: bookId,
        type: "action",
      });
      await notificationToRequester.save();

      notification.message = `Your approved the request from <b>${user.fullName}</b> to borrow the book ${book.title}  by ${book.author}`;
      notification.type = "action";
      await notification.save();

      return res
        .status(200)
        .json({ message: "request to borrow book approved!!!" });
    }
  } else if (action === "declined") {
    request.status = "declined";
    await request.save();
    const notificationToRequester = new Notification({
      from: user._id,
      to: requestedUser._id, //requester
      message: `Your request to borrow the book ${book.title} from <b>${user.fullName}</b> has been declined`,
      bookId: bookId,
      type: "action",
    });
    await notificationToRequester.save();
    notification.message = `Your declined the request from <b>${user.fullName}</b> to borrow 
                                       the book ${book.title}  by ${book.author}`;
    notification.type = "action";
    await notification.save();
    return res
      .status(200)
      .json({ message: "request to borrow book declined!!!" });
  } else {
    return res.status(400).json({ message: "Invalid action!!!" });
  }
};

export const returnBookRequest = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const bookId = req.params.bookId;
  const book = await Books.findById(bookId);
  if (!book) return res.status(400).json({ message: "Book not Found" });

  const BorrowBookInfo = await BorrowBooks.findOne({
    bookId: bookId,
    status: "borrowed",
    borrowedTo: userId,
  });
  if (!BorrowBookInfo)
    return res.status(400).json({ message: "Borrowing details issue" });
  const bookOwner = await User.findById(BorrowBookInfo.borrowedFrom);

  if (!bookOwner) {
    return res.status(404).json({
      message: "Book owner not found",
    });
  }

  const requestSent = await BookRequest.findOne({
    from: userId,
    to: bookOwner._id,
    bookId: bookId,
    type: "return",
  });
  console.log("return request sent", requestSent);
  if (requestSent)
    return res.status(400).json({ message: "Request Sent Already." });

  const bookReturnRequest = new BookRequest({
    from: userId,
    to: bookOwner._id,
    bookId: bookId,
    type: "return",
  });
  console.log("book request", bookReturnRequest);
  const notification = new Notification({
    from: user._id,
    to: bookOwner._id,
    message: `<b>${user.fullName}</b> Requested to Return the book ${book.title} 
                         by ${book.author} to you`,
    type: "request",
    book: bookId,
  });
  console.log("notification", notification);
  await bookReturnRequest.save();
  await notification.save();
  return res.status(200).json({ message: "Request to return book sent!!!" });
};

export const approveReturnRequest = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const { action, notificationId } = req.body;
  const notification = await Notification.findById(notificationId);
  if (!notification)
    return res.status(404).json({ message: "Notification not found" });

  const { from: borrowerId, book: bookId } = notification;
  const borrower = await User.findById(borrowerId);
  if (!borrower) return res.status(400).json({ message: "User not Found" });
  const book = await Books.findById(bookId);
  if (!book) return res.status(400).json({ message: "Book not Found" });

  if (notification.type !== "request")
    return res.status(400).json({ message: "Invalid Request Type" });

  const request = await BookRequest.findOne({
    from: borrower._id,
    to: userId,
    bookId: bookId,
    type: "return",
  });
  if (!request) return res.status(400).json({ message: "Request not Found" });

  if (action === "approved") {
    request.status = "approved";
    await request.save();

    const notificationToBorrower = new Notification({
      from: userId,
      to: borrower._id,
      message: `<b>${user.fullName}</b> has approved your request to return the book ${book.title} by ${book.author}`,
      type: "action",
      book: book._id,
    });
    await notificationToBorrower.save();

    notification.message = `You accepted the request to return the book ${book.title} by ${book.author}
                                       from ${user.fullName}.The book has been added to your book collection`;
    notification.type = "action";
    await notification.save();
    return res.status(200).json({ message: "Returned the book" });
  } else if (action === "declined") {
    request.status = "declined";
    await request.save();
    notification.message = `You rejected the request to return the book ${book.title} by ${book.author}
                                       from ${user.fullName}.`;
    notification.type = "action";
    await notification.save();

    const notificationToBorrower = new Notification({
      from: userId,
      to: borrower._id,
      message: `<b>${user.fullName}</b> has declined your request to return the book ${book.title} by ${book.author}`,
      type: "action",
      book: book._id,
    });
    await notificationToBorrower.save();
    return res.status(200).json({ message: "Declined the request" });
  }
};

export const borrowedBooks = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  //console.log( req.user );
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const getUserBookList = await User.findById(userId)
    .select("bookCollection")
    .populate<{ bookCollection: BookSchemaType[] }>("bookCollection")
    .exec();

  if (!getUserBookList) {
    return res.status(404).json({ message: "User not found" });
  }

  const borrowedBookList = getUserBookList.bookCollection.filter(
    (book) => book.bookType === "borrowedBook",
  );
  const bookTitles = borrowedBookList.map((book) => book.title);
  console.log("bookTitles", bookTitles);

  res.status(200).json(borrowedBookList);
};

export const lentBooks = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  //console.log( req.user );
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const getUserBookList = await User.findById(userId)
    .select("bookCollection")
    .populate<{ bookCollection: BookSchemaType[] }>("bookCollection")
    .exec();

  if (!getUserBookList) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log("Populated lent bookCollection");

  const lentBookList = getUserBookList.bookCollection.filter(
    (book) => book.bookType === "lentBook",
  );
  const bookTitles = lentBookList.map((book) => book.title);
  console.log("bookTitles", bookTitles);

  res.status(200).json(lentBookList);
};

export const borrowBook = async (req: Request, res: Response) => {
  const userId = req.user._id.toString(); //user id
  const { profileUserId, bookId } = req.params; //profile and book id
  const user = await User.findById(userId); //get loggedin user
  if (!user) return res.status(400).json({ message: "User not Found" });
  const profileUser = await User.findById(profileUserId); //get visiting profile id
  const book = await Books.findById(bookId); //get the book
  if (!profileUser || !book)
    return res.status(400).json({ message: "User or Book not Found" });
  const isAlreadyBookExist = user.bookCollection.some(
    (id) => id.toString() === book._id.toString(),
  ); //book exists
  if (isAlreadyBookExist)
    return res.status(400).json({ message: "Book already exist" });
  const notification = new Notification({
    from: user._id,
    to: profileUser._id,
    message: `${user.fullName} Requested to Borrow the book ${book.title} 
                         by ${book.author} from you`,
    type: "request",
    book: bookId,
  });
  await notification.save();
  console.log("notification saved");
  res.status(200).json({ message: "request to borrow book successful!!!" });
};

export const approveDeclineBorrowBook = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { action, notificationId } = req.body;

    if (!["approved", "declined"].includes(action)) {
      return res.status(400).json({
        message: "Invalid action",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    const borrowerId = notification.from;
    const bookId = notification.book;

    if (!borrowerId || !bookId) {
      return res.status(400).json({
        message: "Borrower or book information missing",
      });
    }

    const borrower = await User.findById(borrowerId);

    if (!borrower) {
      return res.status(404).json({
        message: "Borrower not found",
      });
    }

    const bookDetails = await Books.findById(bookId);

    if (!bookDetails) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (action === "approved") {
      if (bookDetails.bookType === "lentBook") {
        return res.status(400).json({
          message: "Book is already lent out",
        });
      }

      if (bookDetails.bookType === "borrowedBook") {
        return res.status(400).json({
          message: "Book is already borrowed",
        });
      }

      const alreadyExists = borrower.bookCollection.some(
        (id) => id.toString() === bookId.toString(),
      );

      if (alreadyExists) {
        return res.status(400).json({
          message: "Book already exists in borrower's collection",
        });
      }

      const borrowedCopy = await Books.create({
        title: bookDetails.title,
        author: bookDetails.author,
        genre: bookDetails.genre,
        borrowedBookId: bookId,
        borrowedBy: borrowerId,
        bookAdded: new Date(),
        publisher: bookDetails.publisher,
        publicationDate: bookDetails.publicationDate,
        pageCount: bookDetails.pageCount,
        description: bookDetails.description,
        bookType: "borrowedBook",
      });

      borrower.bookCollection.push(borrowedCopy._id);
      await borrower.save();

      bookDetails.bookType = "lentBook";
      bookDetails.borrowedBy = borrowerId;
      bookDetails.bookAdded = new Date();

      await bookDetails.save();

      notification.message = `Borrow request approved for "${bookDetails.title}"`;
      notification.type = "action";

      await notification.save();

      await Notification.create({
        from: user._id,
        to: borrower._id,
        message: `Your request to borrow "${bookDetails.title}" has been approved by ${user.fullName}`,
        type: "action",
        book: bookId,
      });

      return res.status(200).json({
        message: "Borrow request approved",
      });
    }

    // Declined

    notification.message = `Borrow request declined for "${bookDetails.title}"`;
    notification.type = "action";

    await notification.save();

    await Notification.create({
      from: user._id,
      to: borrower._id,
      message: `Your request to borrow "${bookDetails.title}" has been declined by ${user.fullName}`,
      type: "action",
      book: bookId,
    });

    return res.status(200).json({
      message: "Borrow request declined",
    });
  } catch (error) {
    console.error("approveDeclineBorrowBook:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });
  const { bookId } = req.body;
  const bookInfo = await Books.findById(bookId);
  if (!bookInfo) return res.status(400).json({ message: "Book not Found" });
  const originalId = bookInfo._id;
  const originalBookInfo = await Books.findById(originalId);
  if (!originalBookInfo)
    return res.status(400).json({ message: "Original Book not Found" });
  const borrowedFromUser = await User.findOne({
    bookCollection: bookInfo._id,
  });
  if (!borrowedFromUser)
    return res.status(400).json({ message: " BUser not Found" });
  await User.findByIdAndUpdate(userId, { $pull: { bookCollection: bookId } });
  originalBookInfo.bookType = "myBook";
  originalBookInfo.borrowedBy = "";
  originalBookInfo.borrowedBookId = "";
  originalBookInfo.bookAdded = new Date();
  await originalBookInfo.save();
  const returendNotification = new Notification({
    from: userId,
    to: borrowedFromUser._id,
    message: `${user.fullName} returned the book ${bookInfo.title} by ${bookInfo.author}`,
    type: "action",
  });
  await returendNotification.save();
  res.status(200).json({ message: "Returned the Book" });
};
