import Book from "../model/book.model.js";
import User from "../model/user.model.js";
import {errorHandler} from '../utils/error.js'

export const getBook = async (req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } 
    catch (error) {
        res.status(500).json(error);
    }
}

export const getLastFiveScores = async (req, res) => {
    try{
        const email = req.user.email;
        const user = User.find({email});
        if(!user){
            return res.status(500).json('Not a valid user');
        }
        return res.status(200).json(user.scores);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

export const saveResult = async (req, res) => {
    try {
        const email = req.user.email;
        const user = User.find({email});
        const arr = user.scores;
        const language = req.query.language;
        const marks = req.query.marks;
        arr = [...arr, {language: language, score: marks}]
        return res.status(200).json('saved successfully');
    } 
    catch (error) {
        return next(errorHandler(500, 'failed'));
    }
}