const nodeMailer = require('nodemailer')

const sendEmail = async (req, res) => {
    const transporter = await nodeMailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'souravsahoo7848@gmail.com',
            pass: 'hpma uico sdrx qtrd'
        }
    });

    const mailOptions = {
        from: '"Sourav" <souravsahoo7848@gmail.com>',
        to: "souravranjan488@gmail.com",
        subject: "OTP Verification",
        text: "your OTP: MGH",
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