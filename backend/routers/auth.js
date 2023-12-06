const express= require('express');
const jwt=require('jsonwebtoken');
const dotenv= require('dotenv');
const verify = require('jsonwebtoken/verify');
dotenv.config();


const verifyToken=(req,res,next)=>{
    const {token} = req.headers;
    if(token){
        let authtoken=token.split(" ")[1];
        jwt.verify(authtoken, process.env.JWT_SEC, (err, data)=>{
            if(err) {res.status(403).json('Invalid Token')}
            req.user=data;
        next();
        })
    }
    else{
        res.status(401).json('You are not authenticated');
    }
}
const verifyTokenAndAuthorization= (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id===req.params.id || req.user.isAdmin) next();
        else{
            res.status(403).json("You are not allowed to do that");
        }
    })
}
const verifyTokenAndAdmin=(req,res, next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin) next();
        else{
            res.status(403).json("Only admins are allowed to do this");
        }
    })
}

module.exports={verifyTokenAndAuthorization, verifyTokenAndAdmin}