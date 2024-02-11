const nodemailer = require('nodemailer')
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const TokenModel = require('../models/token')

function generateRandomToken(length) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(length, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          const token = buffer.toString('hex');
          resolve(token);
        }
      });
    });
}

exports.Login = async (req,res)=>{
    try {
        const {username,password} = req.body
        let pass=""
        await UserModel.findOne({username:username})
        .then(result=>{
            pass = result.password
        })
        .catch(err=>{
            //console.log(pass)
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

exports.Register = async (req,res)=>{
    const {name,username,email,password,interests}  = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
        $or: [
          { email: email },
          { username: username }
        ]
    };
    UserModel.findOne(query)
    .then(async user=>{
        if(user){
            res.status(401).json("Email or Username already registered")
        }
        else{
            const wordPattern = /^[^\s]+$/;
            if (wordPattern.test(username)) {
                const tokenBite = await generateRandomToken(16)
                const token = tokenBite.toString()
                TokenModel.create({name:name,username:username,email:email,
                    password:hashedPassword,interests:interests,token:token})
                
                const transporter = await nodemailer.createTransport({
                    service:'gmail',
                    auth: {
                        user: process.env.USER,
                        pass: process.env.PASS
                    }
                });
                const link = "http://localhost:8000/api/token?token="+token;
                const info = await transporter.sendMail({
                    from: '"ProCollab" <ProCollab@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Confirm Registration on ProCollab", // Subject line
                    text: "Confirm registration by clicking the link",
                    html: `<div>
                        <p>Please confirm your registration`+username+` on ProCollab by just clicking the link given below :</p>
                        <a href=`+link+`>Click here</a>
                    </div>`
                });

                res.status(200).json("Send Email")
            } else {
                res.status(401).json("Username should be a single word")
            }
        }
        
    })
    .catch(err => res.status(401).json("Some problem occurred"));
}

exports.ForgetPassword = async(req,res)=>{
    const username = req.body.username
    //console.log(username)
    UserModel.findOne({username:username})
    .then(async user=>{
        
        if(user){
            const email = user.email
            //console.log(email)
            const tokenBite = await generateRandomToken(6)
            const token = tokenBite.toString()
            const transporter = await nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            });
            
            const info = await transporter.sendMail({
                from: '"ProCollab" <ProCollab@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Forget Password", // Subject line
                text: "Forget Password",
                html: `<div>
                    <p>Your new password is `+token+`. Use this password to log in. Please change this password after log in for your security.</p>
                </div>`
            });
            const newPassword = await bcrypt.hash(token, 10);
            const filter = { username: username };
            const update = {
              $set: { password: newPassword } 
            };
            
            const result = await UserModel.updateOne(filter, update);
            
            if (result.modifiedCount === 1) {
                console.log('Password updated successfully');
                res.status(200).json("Password updated successfully")
            } else {
                console.log('No document found matching the filter');
            }
            //res.status(401).json("Email or Username already registered")
        }
        else{
            res.status(401).json("Username isn't registered")
        }
        
    })
    .catch(err => res.status(401).json("Some problem occurred"));
}