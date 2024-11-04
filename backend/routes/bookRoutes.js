import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import {  } from '../controller/bookController.js';


const router = express.Router();

router.get("/myBooks",protectRoute, getUserProfile);
router.get("/viewBook/:id",protectRoute, getUserProfile);
router.get("/borrowedBooks", protectRoute, friendsRequestSendUnsend);
router.get("/lentBooks", protectRoute, friendList);
router.get("/searchBooks",protectRoute, editProfile);
router.post("/importBooksByQRScan",protectRoute, editProfile);
router.post("/importBooksByImage",protectRoute, editProfile);
router.post("/importBooksManually",protectRoute, editProfile);




export default router;