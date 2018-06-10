import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema({
    email: {type: String, required: true, lowercase: true},
    passwordHash : { type: String, required: true },
}, {timestamps: true }
);


schema.methods.isValidPassword = function isValidPassword(password){
    return bcrypt.compareSync(password, this.passwordHash);
}

// Entcrypt the web token for the user
schema.methods.genJWT = function genJWT(){
    return jwt.sign(
    {
        email: this.email
    }, 
    //Secret key
    process.env.JWT_SECRET
    );
}

// Authenticates the user 
schema.methods.toAuthenticateJSON = function toAuthenticateJSON(){
    return {
        email: this.email,
        token: this.genJWT()
    }
}

export default mongoose.model('User', schema);