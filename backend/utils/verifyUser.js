import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import User from '../model/user.model.js';

export const verifyToken = async(req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if(!token){
            console.log('Didnot recieve the token') // debug
            return next(errorHandler(401, 'Unauthorized'));
        }
        const decodedData=jwt.verify(token, 'jashan' );
        const user=await User.findById(decodedData.id);
        // console.log(user)
        req.user = user;
        next();
    } catch (error) {
        return next(new errorHandler(401,"Unauthorized"))
    }
};