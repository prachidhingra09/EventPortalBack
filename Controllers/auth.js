const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')
const expressjwt = require('express-jwt')
const _ = require('lodash')


exports.signup = async (req,res) => {
    try{
        const userExists = await User.findOne({ email: req.body.email })
        if(userExists)
            return res.status(403).json({
                error: "Email is taken!"
            });
        const user = await new User(req.body)
        await user.save()
        res.status(200).json({ message: "Signup sucessfull please login" })
    }
    catch(error){
        console.log(`That did not go well: ${error}`);

    }

};

exports.signin = (req,res) => {
    const {email,password} = req.body
    User.findOne({email},(err,user) =>  {
        if(err || !user) {
            return res.status(401).json({
                error: "User with that email not found.Please Signup"
            })
        }
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password do not match here"
            })

        }
        const token = jwt.sign({_id: user._id}, process.env.jwt_secret);
        res.cookie("t", token, {expire: new Date() + 9999});
        const {_id,name,email} = user
        return res.json({token, user: {_id,name,email} })


    })


};

exports.signout = (req,res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout success!" });
}

exports.requireSignin = expressjwt({
    algorithms: ['HS256'],
    secret: process.env.jwt_secret,
    userProperty: "auth"


})
