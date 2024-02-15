const TokenModel = require('../models/token')
const UserModel = require('../models/user')
const ChannelModel = require('../models/channel')
const ProjectModel = require('../models/project')
const jwt = require('jsonwebtoken')
const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey:process.env.openai_key
})

exports.findToken = async (req, res) => {
    const token = req.query.token
    await TokenModel.findOne({token:token})
    .then(async result=>{
        const name = result.name
        const username = result.username
        const email = result.email
        const password = result.password
        const interests = result.interests
        await UserModel.create({name:name,username:username,email:email,password:password,interests:interests})
        await TokenModel.deleteOne({token:token})
    })
    .catch(err=>{console.log(err)})

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Created Successfully</title>
            <style>
                /* Add your CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                }
                .container {
                    width: 50%;
                    margin: auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    text-align: center;
                }
                h1 {
                    color: #4CAF50;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Account Created Successfully</h1>
                <!-- You can add more content or customize the design here -->
            </div>
        </body>
        </html>
    `;

    await res.send(htmlContent)
}

exports.allProjects = async(req,res)=>{
    try {
        if (req.query.id) {
            const project = await ProjectModel.findById(req.query.id)
            if (!project) {
                res.status(404).json('Project not found')
            }
            res.status(200).json(project)
        } 
        else if (req.query.user) {
            const project = await ProjectModel.find({project_holder:req.query.user})
            if (!project) {
                res.status(404).json('Project not found')
            }
            res.status(200).json(project)
        } 
        else {
            const projects = await ProjectModel.find()
            res.status(200).json(projects);
        }
    } catch (error) {
        res.status(500).json('Internal server error');
    }
}

exports.verify = async (req,res)=>{
    const token = req.params.token
    if(!token)res.status(401).json("The token was not available")
    else{
        jwt.verify(token,process.env.jwt_secret_key,(err,decoded)=>{
            if(err){res.status(404).json("Token is wrong");}
            else res.status(200).json("Allready logged in")
        })
    }
}

exports.Resource = async(req,res)=>{
    try {
    const user = req.query.user
    const userRes = await UserModel.findOne({ username:user });
    if (!userRes) {
        res.status(404).json('User not found')
    }
    const interests = userRes.interests;
    if(interests.length==0){
        res.status(200).json('Nothing to show!')
    }
    else{
        let instructionsAndResources = `I am interested in `
        for (let i = 0; i < interests.length; i++) {
            instructionsAndResources+=interests[i]+", "
        }
        instructionsAndResources += `Please give me some instructions on how to be good in these fields, `
        instructionsAndResources += `and give some resources or playlist or something else to follow to learn.
        And give the response in just html codes with some design.Dont use any other writing without html code.
        Give it shortly, if it is possible to give the response in 100 words`
        
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages:[{"role":"user","content":instructionsAndResources}]
        })
        
        res.status(200).send(response.choices[0].message.content)
    }
    } catch (error) {
        res.status(404).send(error)
    }
}

exports.Search = async (req,res)=>{
    try {
        const keyword = req.query.word

        const projects = await ProjectModel.find({
            $or: [
                { title: { $regex: new RegExp(keyword, 'i') } },
                { description: { $regex: new RegExp(keyword, 'i') } },
                { tags: { $regex: new RegExp(keyword, 'i') } }
            ]
        });

        res.status(200).json(projects)
    } catch (error) {
        console.error(error)
        res.status(500).json('Internal Server Error')
    }
}

exports.User = async(req,res)=>{
    try {
        const token = req.params.token
        if (!token) {
            res.status(401).json('JWT token not found')
        }
        else{
            const decodedToken = jwt.verify(token, process.env.jwt_secret_key)
            const username = decodedToken.username
            res.status(200).json({ username:username })
        }
    } catch (error) {
        res.status(404).json('Invalid JWT token')
    }
}

exports.allChannels = async(req,res)=>{
    try {
        if (req.query.id) {
            const project = await ChannelModel.findById(req.query.id)
            if (!project) {
                res.status(404).json('Channel not found')
            }
            res.status(200).json(project)
        } 
        else if (req.query.user) {
            const project = await ChannelModel.find({channel_holder:req.query.user})
            if (!project) {
                res.status(404).json('Channel not found')
            }
            res.status(200).json(project)
        } 
        else {
            const projects = await ChannelModel.find()
            res.status(200).json(projects);
        }
    } catch (error) {
        res.status(500).json('Internal server error');
    }
}

exports.getUser = async(req,res)=>{
    try {
        const username = req.body.username

        const user = await UserModel.findOne({ username:username })

        if (!user) {
            res.status(404).json("User not found")
        }
        else res.status(200).json({
            name: user.name,
            username: user.username,
            email: user.email,
            interests: user.interests
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

exports.ChannelSearch = async(req,res)=>{
    try {
        const keyword = req.query.word

        const channels = await ChannelModel.find({
            $or: [
                { title: { $regex: new RegExp(keyword, 'i') } },
                { description: { $regex: new RegExp(keyword, 'i') } },
                { tags: { $regex: new RegExp(keyword, 'i') } }
            ]
        });

        res.status(200).json(channels)
    } catch (error) {
        console.error(error)
        res.status(500).json('Internal Server Error')
    }
}

exports.userChannel = async(req,res)=>{
    const { username } = req.body

    try {
        const channels = await ChannelModel.find({ 'join.name': username })
        res.status(200).json(channels)
    } catch (error) {
        console.error(error)
        res.status(500).json('Server error')
    }
}