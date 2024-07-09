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
      const user = req.user;
      const { language, marks } = req.params;
      const {email} = req.body;
      console.log(email)
  
      // Find the user by email
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        // Update the user's scores
        const newScore = { language, score: Number(marks) };
        existingUser.scores.push(newScore);
  
        // Save the updated user document
        await existingUser.save();
  
        res.status(200).json('Saved successfully');
      } else {
        console.log('error in saving 1')
        res.status(400).json({ message: 'User does not exist' });
      }
    } catch (error) {
      console.log(error);
      console.log('error in saving 2')
      return res.status(500).json({message: 'Some error occured'})
    }
  };