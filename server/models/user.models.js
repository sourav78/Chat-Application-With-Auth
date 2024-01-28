const mongoose = require('mongoose')
const bcrypt  = require('bcrypt')
const JWT = require('jsonwebtoken')

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
    },
    profileUrl: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
    }
}, { timestamps: true})

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)

    next()
})

userSchema.methods.jwtToken = function(){
    payload = {
        _id: this._id,
        email: this.email,
    }

    const token = JWT.sign(payload, process.env.JWT_SECRET)

    return token
}

const userModel = mongoose.model('users', userSchema)

module.exports = userModel