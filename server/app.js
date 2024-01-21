require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')

const connectDb = require('./config/db')
const userRouter = require('./routes/user.routes')


const app = express()

app.use(express.json())
app.use(cookieParser())

connectDb()


// app.get("/", (req, res) => {
//     res.send("Hello world")
// })

app.use("/", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server started: http://localhost:${process.env.PORT}`);
})