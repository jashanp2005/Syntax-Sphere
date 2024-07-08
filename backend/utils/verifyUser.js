import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        console.log('Didnot recieve the token') // debug
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, 'jashan', (err, user) => {
        if(err){
            console.log(err.message);
            console.log('error in jwt verify')
            return next(errorHandler(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    });
};