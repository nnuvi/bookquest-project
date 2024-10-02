import express from 'express'
import { signup } from "../controller/authController.js";

const router = express.Router();

router.get('/test', (req, res) => {
     res.json({ message: "Test route is working!" });
 });

router.post("/signup", signup);

//router.post("/login", Login);

//router.post("/logout", Logout);

//router.get("/me", GetMe);

export default router;