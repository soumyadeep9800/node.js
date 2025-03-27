const jwt= require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware=(req,res,next)=>{
    const authheader =req.headers.authorization;
    if(!authheader) return res.status(401).json({error: 'Unauthorized'});

    try {
        const token=authheader.split(" ")[1];

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded;
        next();
    } catch (error) {
        console.log('error');
        res.status(401).json({error:'invalid token'});
    }
}

const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports={
    jwtAuthMiddleware,
    generateToken
};