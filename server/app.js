require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const connectDb = require('./config/db')
const userRouter = require('./routes/user.routes')


const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())

connectDb()


// app.get("/", (req, res) => {
//     res.send("Hello world")
// })

app.use("/", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server started: http://localhost:${process.env.PORT}`);
})