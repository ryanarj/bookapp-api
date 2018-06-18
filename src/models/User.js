import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema(
{
    email: {
        type: String, 
        required: true, 
        lowercase: true, 
        index: true, 
        unique: true
    },
    passwordHash : { type: String, required: true },
    confirmed: {type: Boolean, default: false}
}, 
    {timestamps: true }
);


schema.methods.isValidPassword = function isValidPassword(password){
    return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password){
    this.passwordHash = bcrypt.hashSync(password, 10);
};

// Entcrypt the web token for the user
schema.methods.genJWT = function genJWT(){
    return jwt.sign(
    {
        email: this.email
    }, 
    //Secret key
    process.env.JWT_SECRET
    );
};

// Authenticates the user 
schema.methods.toAuthenticateJSON = function toAuthenticateJSON(){
    return {
        email: this.email,
        confirmed: this.confirmed,
        token: this.genJWT()
    }
};

schema.plugin(uniqueValidator, {message: 'Email is taken'});

export default mongoose.model('User', schema);