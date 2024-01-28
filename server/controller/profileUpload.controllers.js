const uploadOnCloudynary = require("../utils/uploadToCloudinary.utils")

const uploadProfilePicture = async (req, res) => {

    const { _id } = req.body

    const result = await uploadOnCloudynary(`./public/profiles/${req.file.filename}`, _id)

    console.log(result);
    console.log(_id);

    if (result === null) {
        return res.status(200).json({
            success: false,
            data: "Image not uploaded"
        })
    } else {
        return res.status(200).json({
            success: true,
            data: result
        })
    }
}

module.exports = uploadProfilePicture