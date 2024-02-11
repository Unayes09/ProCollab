const TokenModel = require('../models/token')
const UserModel = require('../models/user')

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