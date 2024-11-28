import Notification from "../model/notificationModel.js";
import User from "../model/userModel.js";
import Books from "../model/bookModel.js";
import moment from "moment";

export const allNotifications = async (req, res) => {
     try {
          const userId = req.user._id;
          console.log(userId);
          const notifications = await Notification.find({ to:userId}).sort({ createdAt: -1 });
          console.log(notifications);
          if(!notifications) {
               return res.status(404).json({ message: "No notifications found" });
          }
          await Notification.updateMany({to:userId}, {read:true});
          res.json(notifications);
     } catch (error) {
          res.status(400).json({ error: error.message});
     }
}

export const deleteNotifications = async (req, res) => {
     try {
          const userId = req.user._id;
          const notificationId = req.params.id;
          const notification = await Notification.findById(notificationId);
          if (!notification) {
               return res.status(404).json({ error: "Notification not found" });
          }
          if(notification.to.toString() !== userId,toString()) {
               return res.status(403).json({ error: "You can't delete this notification" });
          }
          //await Notification.findByIdAndDelete(notificationId);
          await notification.remove();
          res.json({ message: "Notification deleted" });
     } catch (error) {    
          res.status(400).json({ error: error.message });
     }
}

export const reminderNotification = async (req, res) => {
     try {
          const userId = req.user._id;
          const today = new Date();
          const user = await User.findById(userId);
          if(!user) return res.status(400).json({message: "User not Found"});
          //console.log("user", user);
          //console.log("user.bookCollection, ", user.bookCollection);
          const userBooks = await User.findById(userId).populate('bookCollection');
          //console.log(userBooks.bookCollection);
          const borrowedBooks = userBooks.bookCollection.filter(book => {
               console.log(book);
               console.log(book.bookType); // Log each book in the collection to ensure the structure is correct
               return book.bookType === 'borrowedBook';
          });
          console.log(borrowedBooks);
          const borrowedBookDetails = borrowedBooks.map(book => book._id);
          console.log("Books borrowed by user:", borrowedBookDetails);

          borrowedBooks.forEach(async (book) => {
               console.log("j",book);
               
                   // Check if the book has an `addedDate` or `createdAt` field
                   const bookAddedDate = moment(book.bookAdded || book.createdAt); // Fallback to createdAt if addedDate doesn't exist
                   const today = moment();
                   const daysPassed = today.diff(bookAddedDate, 'days'); // Calculate days passed
   
                   console.log("Days passed: ", daysPassed);

                   const notificationSent = await Notification.findOne({
                    to: user._id,
                    message: `Reminder: It's been 15 days since you added the book "${book.title}". Consider returning it.`});

                    console.log("notification sent", notificationSent);
                    if(notificationSent){
                         console.log("Notification already sent");
                         return res.status(200).json({ message: "Reminder already Sent" });
                    }

                   if (daysPassed === 0) {
                       // Send reminder notification
                       const reminderNotification = new Notification({
                           from: user._id, // System or admin
                           to: user._id, // Notify the user
                           message: `Reminder: It's been 15 days since you added the book "${book.title}". Consider returning it.`,
                           type: "reminder",
                       });
                       await reminderNotification.save();
                       console.log(`Reminder sent to user ${user.fullName} for book "${book.title}"`);
                       return res.status(200).json({ message: "Reminder Sent" });
                   }
           });
          
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
}