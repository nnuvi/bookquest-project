import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
     from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     to: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     sentTime: {
          type: Date,
          default: Date.now,
     },
     status: {
          type: String,
          enum: ['pending', 'accepted'],
          default: false,
     }
}, {timestamps: true});

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

export default FriendRequest;