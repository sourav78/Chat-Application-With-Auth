require('dotenv').config()
const express = require('express')

const connectDb = require('./config/db')
const userRouter = require('./routes/user.routes')


const app = express()

app.use(express.json())

connectDb()


// app.get("/", (req, res) => {
//     res.send("Hello world")
// })

app.use("/user", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server started: http://localhost:${process.env.PORT}`);
})