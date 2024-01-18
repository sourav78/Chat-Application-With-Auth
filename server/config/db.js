// import mongoose from "mongoose";
const mongoose = require('mongoose')

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("DB Connected");
    }).catch((err) => {
        console.log("DB Error : ", err);
    })
}

// export default connectDb
module.exports = connectDb