const validateEmail = require('email-validator')
const bcrypt = require('bcrypt')

const userModel = require('../models/user.models')

const register = async (req, res) => {
    const { userName, email, password} = req.body

    if(!userName, !email, !password){
        return res.status(400).json({
            success: false,
            msg: "All fields are required"
        })
    }

    const validatedEmail = validateEmail.validate(email)
    if(!validatedEmail){
        return res.status(400).json({
            success: false,
            msg: "Invalid email address"
        })
    }

    try {
        const entry = await userModel.create({
            userName,
            email,
            password
        })

        return res.status(200).json({
            success: true,
            msg: entry
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }


}

const login = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({
            success: false,
            msg: "All fields are required"
        })
    }

    try {
        const user = await userModel.findOne({email})

        const encodedPassword = await bcrypt.compare(password, user.password)
        if(!encodedPassword){
            return res.status(400).json({
                success: false,
                msg: "Invalid/wrong password"
            })
        }

        const token = user.jwtToken()

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000
        }

        res.cookie("token", token, cookieOption)

        return res.status(200).json({
            success: true,
            msg: user
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Invalid email address"
        })
    }

}

const userChats = async (req, res) => {
    const { _id, email } = req.user

    if(!_id || !email){
        return res.status(400).json({
            success: false,
            msg: "Not authorize"
        })
    }

    const user = await userModel.findById(_id)

    return res.status(200).json({
        success: true,
        msg: user
    })
}

const logout = (req, res) => {
    try {
        
        res.cookie('token', null);
        return res.status(200).json({
            success: true,
            msg: "Logged out successfully",
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const forgotPassword = async (req, res) => {

    const { email, password, confirmPassword } = req.body

    if(!email, !password, !confirmPassword) {
        return res.status(400).json({
            success: false,
            msg: "All fields are required"
        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            success: false,
            msg: "Password and conform password should be same"
        })
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await userModel.findOneAndUpdate({email}, {
            password: hashedPassword
        })

        return res.status(200).json({
            success: true,
            msg: result
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }

}

module.exports = {
    register,
    login,
    userChats,
    forgotPassword,
    logout
}