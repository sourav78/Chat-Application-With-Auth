const userModel = require("../models/user.models");
const uploadOnCloudynary = require("../utils/uploadToCloudinary.utils")

const uploadProfilePicture = async (req, res) => {

    const { _id } = req.body

    const result = await uploadOnCloudynary(`./public/profiles/${req.file.filename}`, _id)

    // https://res.cloudinary.com/sourav78/image/upload/v1706409814/chat-profile/8387292xh1y83.png--

    if (result === null) {
        return res.status(200).json({
            success: false,
            data: "Image not uploaded"
        })
    } else {

        try {
            const userProf = await userModel.findByIdAndUpdate(_id, {
                profileUrl: result.secure_url
            })

            return res.status(200).json({
                success: true,
                data: result
            })
        } catch (error) {
            return res.status(200).json({
                success: false,
                data: "Image not updated"
            })
        }
    }
}

module.exports = uploadProfilePicture