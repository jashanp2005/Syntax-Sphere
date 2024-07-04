import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to the databse')).catch((error) => console.log('Error: ' + error));

app.use('/book', bookRoute);
app.use('/user', userRoute);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))