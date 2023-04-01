require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../models/authSchema");

const controller = {};

controller.creatingNewUser = async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        let newUser = await new Auth({
            ...req.body,
            password : hashedPassword
        });
        newUser = await newUser.save();
        res.status(201).json({status : "Success", message : "successfully created new user."});
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.userLogin = async (req, res) => {
    try {
        let user = await Auth.findOne({email : req.body.email});
        if(!user) return res.status(403).json({status : "Failed", message : "No user with such login!!"});
        if(await bcrypt.compare(req.body.password, user.password)) {
            let authToken = await jwt.sign({...user}, process.env.SECRET);
            res.status(200).json({status : "Success", token : `JWT ${authToken}`});
        } else {
            res.status(403).json({status : "Failed", message : "password doesn't match!!"});
        }
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

module.exports = controller;