import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post("/", (req, res) => {
    const { credentials } = req.body;
    // get the user information
    User.findOne({ email: credentials.email }).then(user =>{
        // If the user is present then authenticate the user
        if(user && user.isValidPassword(credentials.password)){
            res.json({ user: user.toAuthenticateJSON() });
        } else {
            res.status(400).json({ errors: { global: "Invalid Credentials "}});
        }
    });
});

export default router;