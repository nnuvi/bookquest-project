import express from "express"
import dotenv from "dotenv";


import authRoutes from "./routes/authRoutes.js"
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
     console.log(`Server is running on port ${PORT}`);
     connectMongoDB();
})
