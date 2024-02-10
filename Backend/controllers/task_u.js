const nodemailer = require('nodemailer')
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

exports.Login = async (req,res)=>{
    try {
        const {username,password} = req.body
        let pass=""
        await UserModel.findOne({username:username})
        .then(result=>{
            pass = result.password
        })
        if(pass==""){
            res.status(401).json("Username is wrong!")
        }
        else{
            bcrypt.compare(password, pass, function(err, result) {
                if(err)console.log(err);
                if(result){
                    const token= jwt.sign({username:username},process.env.jwt_secret_key,{expiresIn:"30d"})
                    res.cookie("token",token)
                    res.status(200).json("Successsfully Login!")
                }
                else{
                res.status(401).json("Password is wrong!")
                }
            });
        }
    } catch (error) {
        res.status(404).json("Some Error Occured")
    }
}