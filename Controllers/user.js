const User = require('../models/user');
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

exports.userById = (req, res, next, id) => {
    User.findById(id)
    .populate('following','_id name')
    .populate('followers','_id name')
    .exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user
        next()
    })
}

exports.hasAuthorization = (req,res,next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        });
    }
}

exports.allUsers = (req,res) => {
    User.find((err,users) => {
        if(err || !users) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(users);
    }).select("name email created updated")
}

exports.getUser = (req,res) => {
    //console.log(res.json(req.profile))
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined
    return res.json(req.profile);
    
}


