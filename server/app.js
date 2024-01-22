require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { Server } = require('socket.io')
const http = require('http')

const connectDb = require('./config/db')
const userRouter = require('./routes/user.routes')


const app = express()

const server = http.createServer(app)

app.use(express.json())
app.use(cors())
app.use(cookieParser())

connectDb()

const io = 

app.use("/", userRouter)

server.listen(process.env.PORT, () => {
    console.log(`Server started: http://localhost:${process.env.PORT}`);
})