import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getUserProfile, editProfile, friendsRequestSendUnsend, friendList, searchProfile } from '../controller/userController.js';


const router = express.Router();

router.get("/profile/:id",protectRoute, getUserProfile);
router.post("/friends/:id", protectRoute, friendsRequestSendUnsend);
router.post("/friends", protectRoute, friendList);
router.post("/editProfile",protectRoute, editProfile);
router.get("/searchProfile",protectRoute, searchProfile);


export default router;