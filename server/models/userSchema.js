import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        unique:true
    },
    password :{
        type: String,
        required: true
    },
    isAdmin :{
        type: Number,
        default: 0
    },
});

const User = new mongoose.model("User",UserSchema)

export default User;