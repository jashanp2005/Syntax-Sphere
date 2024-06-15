import express from "express"; 
import mongoose from "mongoose"; 
import cookieParser from "cookie-parser"; 
import userRoutes from './routes/user.route.js'; 
import authRoutes from './routes/auth.route.js'; 
 
mongoose.connect('mongodb://localhost:27017/Server') 
    .then(() => { 
        console.log('Database is connected') 
    }).catch((e) => { 
        console.log(e); 
    }) 
 
const app = express(); 
app.use(express.json()); 
app.use(cookieParser()); 
 
app.use('/api/user', userRoutes) 
app.use('/api/auth', authRoutes) 
 
app.listen(3000, () => { 
    console.log('server running on port 3000') 
}) 
 
// add a middleware to handle all the errors 
app.use((err, req, res, next) => { 
    const statusCode = err.statusCode || 500; 
    const message = err.message || 'Internal server error'; 
    res.status(statusCode).json({ 
        success: false, 
        statusCode, 
        message, 
    }); 
});