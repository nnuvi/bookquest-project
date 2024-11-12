import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getUserProfile, editProfile, friendsRequestSendUnsend, friendList } from '../controller/userController.js';


const router = express.Router();

router.get("/profile/:username",protectRoute, getUserProfile);
router.post("/friends/:id", protectRoute, friendsRequestSendUnsend);
router.post("/friends", protectRoute, friendList);
router.post("/editProfile",protectRoute, editProfile);


export default router;