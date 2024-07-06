import Book from "../model/book.model.js";
import User from "../model/user.model.js";

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
        const {email} = req.user;
        const user = await User.find({email});
        if(!user){
            return res.status(500).json('Not a valid user');
        }
        return res.status(200).json(user.scores);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}