import express from "express";
import { getBook, saveResult } from "../controller/book.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/', getBook);
router.post('/save/:language/:marks', verifyToken, saveResult);

export default router;