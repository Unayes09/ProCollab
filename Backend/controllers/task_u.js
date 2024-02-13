const nodemailer = require('nodemailer')
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const TokenModel = require('../models/token')
const ProjectModel = require('../models/project')

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

exports.changePassword = async(req,res)=>{
    const { username, old_password, new_password } = req.body;
    try {
        const user = await UserModel.findOne({ username:username });

        if (!user) {
            res.status(404).json("User not found.");
        }
        bcrypt.compare(old_password, user.password,async function(err, result) {
            if(err)console.log(err);
            //console.log(result)
            if(result){
                const newHash_password = await bcrypt.hash(new_password, 10);
                user.password = newHash_password;
                await user.save();
                res.status(200).json("Password changed successfully.");
            }
            else{
                res.status(401).json("Old password is incorrect.");
            }
        });
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error.");
    }
}

exports.createProject = async(req,res)=>{
    const{project_holder,title,subject,tags,photos,description,shareable_links} = req.body
    ProjectModel.create({project_holder:project_holder,title:title,subject:subject,
        description:description,tags:tags,photos:photos,shareable_links:shareable_links})
    .then(result=>res.status(201).json("New Project Created"))
    .catch(err=>res.status(404).json(err))
}

exports.deleteProject = async(req,res)=>{
    const {id} = req.body
    ProjectModel.deleteOne({_id:id})
    .then(result=>res.status(200).json("Project Deleted"))
    .catch(err=>res.status(404).json(err))
}

exports.Like = async(req,res)=>{
    const projectId = req.body.id
    try {
        let project = await ProjectModel.findById(projectId)

        if (!project) {
            res.status(404).json({ message: "Project not found" })
        }
        if (!project.like) {
            project.like = 1
        } else {
            project.like += 1
        }

        await project.save()

        res.status(200).json("Like incremented successfully")
    } catch (err) {
        console.error(err)
        res.status(500).json("Server Error")
    }
}

exports.DisLike = async(req,res)=>{
    const projectId = req.body.id
    try {
        let project = await ProjectModel.findById(projectId)

        if (!project) {
            res.status(404).json({ message: "Project not found" })
        }
        if (!project.dislike) {
            project.dislike = 1
        } else {
            project.dislike += 1
        }

        await project.save()

        res.status(200).json("Dislike incremented successfully")
    } catch (err) {
        console.error(err)
        res.status(500).json("Server Error")
    }
}

exports.Feedback = async(req,res)=>{
    const {email,description} = req.body
    try {
        const transporter = await nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
        const info = await transporter.sendMail({
            from: email, // sender address
            to: "playonbdltd@gmail.com", // list of receivers
            subject: "Feedback from "+email, // Subject line
            text: "Feedback",
            html: `<div>
                <p>`+description+`</p>
            </div>`
        })

        res.status(200).json("Send Feedback")
    } catch (error) {
        res.status(400).json("Error find.")
    }
}

exports.Comment = async(req,res)=>{
    try {
        const { projectId, username, comment } = req.body

        const project = await ProjectModel.findById(projectId)

        if (!project) {
            return res.status(404).json('Project not found')
        }

        project.comments.push({ name: username, comment: comment })

        await project.save();

        res.status(200).json('Comment added successfully')
    } catch (error) {
        console.error(error)
        res.status(500).json('Internal Server Error')
    }
}