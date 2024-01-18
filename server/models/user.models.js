const mongoose = require('mongoose')
const bcrypt  = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true})

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)

    next()
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel