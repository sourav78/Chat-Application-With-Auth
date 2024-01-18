
const validateEmail = require('email-validator')
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

const login = (req, res) => {

}

const userChats = (req, res) => {

}

module.exports = {
    register,
    login,
    userChats
}