// import dotenv from 'dotenv'
require('dotenv').config()
// dotenv.config()
// import express from 'express'
const express = require('express')

// import connectDb from './config/db'
const connectDb = require('./config/db')
// import connectDb from './databse'


const app = express()

connectDb()


app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(process.env.PORT, () => {
    console.log(`Server started: http://localhost:${process.env.PORT}`);
})