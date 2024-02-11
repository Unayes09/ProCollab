const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

dotenv.config({path:'./.env'})

mongoose.connect(process.env.URI)
.then(err=>{console.log("MyDB is connected")})
.catch(err=>{console.log("Check your internet connection")})

app.listen(8000, () => {
    console.log("server is running")
})


app.use('/auth', require('./routes/task_u'))
app.use('/api',require('./routes/api_u'))