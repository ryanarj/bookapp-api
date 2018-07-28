import mongoose from 'mongoose';

const schema = new mongoose.Schema(
{
    blog: {
        type: String, 
        required: true, 
        lowercase: true, 
        unique: true
    },
}, 
    {timestamps: true }
);
 