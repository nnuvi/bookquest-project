/* ===================== BOOK ===================== */
export type BookType = {
  _id?: string;

  title: string;
  author: string[];
  genre: string[];

  publisher?: string;
  publicationDate?: Date | null;
  pageCount?: number | null;
  description?: string;

  isbn?: string;

  bookType: "myBook" | "borrowedBook" | "lentBook";

  bookAdded?: Date;

  createdAt?: Date;
  updatedAt?: Date;
};

export type BooksType = BookType[];

/* ===================== USER ===================== */
export type UserType = {
  _id?: string;

  username: string;
  fullName: string;
  email: string;
  password: string;

  friends: string[];

  profileImg?: string;
  bio?: string;

  role: "admin" | "user";

  bookCollection: string[];

  createdAt?: Date;
  updatedAt?: Date;
};

/* ===================== BOOK REQUEST ===================== */
export type BookRequestType = {
  _id?: string;

  from: string;
  to: string;
  bookId: string;

  type: "borrow" | "return";

  borrowedDate?: Date;

  status: "requested" | "approved" | "declined";

  createdAt?: Date;
  updatedAt?: Date;
};

/* ===================== BORROW BOOK ===================== */
export type BorrowBookType = {
  _id?: string;

  borrowedFrom: string;
  borrowedTo: string;
  bookId: string;

  borrowDate?: Date;
  returnDate?: Date;

  status: "borrowed" | "returned";

  createdAt?: Date;
  updatedAt?: Date;
};

/* ===================== MESSAGE ===================== */
export type MessageType = {
  _id?: string;

  from: string;
  to: string;

  message: string;

  sentTime?: Date;

  read: boolean;

  createdAt?: Date;
  updatedAt?: Date;
};

/* ===================== NOTIFICATION ===================== */
export type NotificationType = {
  _id?: string;

  from: string;
  to: string;

  type: "reminder" | "request" | "follow" | "action";

  read: boolean;

  message: string;

  request?: "approved" | "declined";

  book?: string;

  createdAt?: Date;
  updatedAt?: Date;
};

/* ===================== REMINDER ===================== */
export type ReminderType = {
  _id?: string;

  to: string;
  bookId: string;

  type: "borrow" | "lent";

  daysPassed?: Date;

  message: string;

  createdAt?: Date;
  updatedAt?: Date;
};