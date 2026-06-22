import type { Request, Response } from "express";
import Notification from "../model/notificationModel.js";
import User from "../model/user.model.js";
import Books from "../model/book.model.js";
import moment from "moment";
import { BookType } from "../types/types.js";

export const allNotifications = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const notifications = await Notification.find({ to: userId }).sort({
    createdAt: -1,
  });
  console.log(notifications.length);
  if (!notifications) {
    return res.status(404).json({ message: "No notifications found" });
  }
  await Notification.updateMany({ to: userId }, { read: true });
  res.json(notifications);
};

export const deleteNotifications = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const notificationId = req.params.id;

  const notification = await Notification.findById(notificationId);

  if (!notification) {
    return res.status(404).json({ error: "Notification not found" });
  }

  // safer comparison (ObjectId-safe)
  if (notification.to.toString() !== userId.toString()) {
    return res.status(403).json({
      error: "You can't delete this notification",
    });
  }

  await Notification.findByIdAndDelete(notificationId);

  return res.json({ message: "Notification deleted" });
};

export const reminderNotification = async (req: Request, res: Response) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const userBooks = await User.findById(userId).populate<{
    bookCollection: BookType[];
  }>("bookCollection");

  if (!userBooks?.bookCollection) {
    return res.status(404).json({ message: "No books found" });
  }

  const borrowedBooks = userBooks.bookCollection.filter(
    (book) => book.bookType === "borrowedBook",
  );

  const today = moment();
  let sent = false;

  for (const book of borrowedBooks) {
    const bookAddedDate = moment(book.bookAdded || book.createdAt);
    const daysPassed = today.diff(bookAddedDate, "days");

    // IMPORTANT: make query stable (DON'T rely only on message string)
    const notificationSent = await Notification.findOne({
      to: user._id,
      type: "reminder",
      "metadata.bookId": book._id, // <-- recommended improvement (see note below)
    });

    if (notificationSent) continue;

    if (daysPassed === 15) {
      await Notification.create({
        from: user._id,
        to: user._id,
        message: `Reminder: It's been 15 days since you added the book "${book.title}". Consider returning it.`,
        type: "reminder",
        // recommended improvement:
        // metadata: { bookId: book._id }
      });

      sent = true;
    }
  }

  if (sent) {
    return res.status(200).json({ message: "Reminder Sent" });
  }

  return res.status(200).json({ message: "No reminders needed" });
};
