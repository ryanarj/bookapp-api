import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const header = req.headers.authorization;
    let token;
    if (header) token = header.spilt(' ')[1];

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({errors: {global: "Invalid Token"}});
            } else {
                req.userEmail = decoded.email;
                next();
            }
        })
    } else {
        res.status(401).json({ errors: {global : "No token"}});
    }
}