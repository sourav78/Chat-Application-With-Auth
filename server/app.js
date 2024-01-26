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
app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
        credentials: true
    }
))
app.use(cookieParser())

connectDb()

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ['GET', 'POST'],
//         credentials: true
//     }
// })

// io.on('connection', (socket) => {
//     console.log('User conected', socket.id);

//     socket.emit('welcome', `welcome to the server ${socket.id}`)

//     socket.on('mmm', (msg) => {
//         console.log(msg);
//         io.emit('mmm', msg)
//     })

//     socket.on("disconnect", () => {
//         console.log("User disconnected", socket.id);
//     })
// })


app.use("/", userRouter)

server.listen(process.env.PORT, () => {
    console.log(`Server started: http://localhost:${process.env.PORT}`);
})