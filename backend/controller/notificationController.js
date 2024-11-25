import Notification from "../model/notificationModel.js";

export const allNotifications = async (req, res) => {
     try {
          const userId = req.user._id;
          const notifications = await Notification.find({ to:userId}).populate({
               path: 'from',
               select: 'name username profileImg'

          });
          await Notification.updateMany({to:"userId"}, {read:true});
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