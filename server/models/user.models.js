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
        default: "https://media.istockphoto.com/id/1452776340/photo/senior-hispanic-couple-kayaking.jpg?b=1&s=612x612&w=0&k=20&c=Ja5Q6jsXnISd8KBICUoV5I4tErhxR6GxPsADlMPSjdQ="
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