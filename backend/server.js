import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js"


import connectMongoDB from "./db/connectMongoDB.js";


dotenv.config();

const app = express();

app.use(express.json({limit:"1mb"}));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);


const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
     console.log(`Server is running on port ${PORT}`);
     connectMongoDB();
});
