import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';


import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"


import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();

const corsOptions ={
     origin:'http://localhost:8081', 
     credentials:true,            
     optionSuccessStatus:200,
     methods: ['GET', 'POST', 'PUT'],
     allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions));

app.use(express.json({limit:"1mb"}));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/notifications", notificationRoutes);


const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
     console.log(`Server is running on port ${PORT}`);
     connectMongoDB();
});
