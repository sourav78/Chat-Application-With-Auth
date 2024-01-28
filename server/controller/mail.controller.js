const nodeMailer = require('nodemailer');
const generateOTP = require('../utils/generateOtp.utils');

const sendEmail = async (req, res) => {
    const transporter = await nodeMailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: '"Sourav" <no-reply@example.com>',
        to: "souravranjan488@gmail.com",
        // to: "souravranjan488@gmail.com, chandanhans2003@gmail.com, subratsahoobulu8480@gmail.com, kumargiripramod9@gmail.com",
        subject: "OTP Verification",
        text: `your OTP: ${generateOTP()}`,
        replyTo: 'no-reply@example.com',
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json(info);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.toString());
    }
}

module.exports = sendEmail