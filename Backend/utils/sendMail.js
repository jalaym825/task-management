const nodemailer = require("nodemailer");
const config = require('../config.json');

module.exports = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config.mail.user,
            pass: config.mail.pass,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: { name: "Jalay Movaliya", address: 'jalay217@gmail.com' }, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            // html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
}