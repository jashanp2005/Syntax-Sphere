import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    language: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    }
});

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    scores: [courseSchema]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;