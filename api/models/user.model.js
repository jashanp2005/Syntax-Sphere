import mongoose from "mongoose"; 
 
const userSchema = new mongoose.Schema({ 
    username: { 
        type: String, 
        required: true, 
        unique: true, 
    }, 
    email: { 
        type: String, 
        unique: true, 
        required: true, 
    }, 
    password: { 
        type: String, 
        required: true, 
    }, 
    percentage: { 
        type: Number, 
        default: -1, 
    } 
}, {timestamps: true}); 
 
// the timestamps true option is used to automatically add two properties to the schema, createdAt and updatedAt 
// These properties are managed by Mongoose, and their values are automatically set when a document is created and updated. 
 
const User = mongoose.model('User', userSchema) 
 
export default User;