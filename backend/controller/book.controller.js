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
      console.log(user);
      const { language, marks } = req.params;
  
      const existingUser = await User.findOne({ email:user.email });
  
      if (existingUser) {
        const newScore = { language, score: Number(marks) };
        existingUser.scores.push(newScore);
  
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