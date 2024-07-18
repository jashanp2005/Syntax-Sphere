import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const {fullname, email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        });
        await createdUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            }
        });
    } 
    catch (error) {
        console.log('Error: ' + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const validUser = await User.findOne({email});
        if(!validUser){
            return res.status(400).json({message: 'User does not exist'});
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword){
            return res.status(400).json({message: 'invalid password'});
        }
        const token = jwt.sign({id: validUser._id}, 'jashan');

        const { password: pass, ...rest } = validUser._doc;

            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                sameSite:"none",
                secure:true
            }).
            json({
                message: 'Login Successfull',
                user: {
                    _id: validUser._id,
                    fullname: validUser.fullname,
                    email: validUser.email
                }
            })
    } 
    catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const logout = (req, res) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json({message: 'Logout successfull'});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'some error occured', error: error});
    }
}