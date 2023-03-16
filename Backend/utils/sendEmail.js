const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

    // const transporter = nodemailer.createTransport({
    //     service: process.env.SMPT_SERVICE,
    //     host: 'smtp.hostinger.com',
    //     auth: {
    //         user: process.env.SMPT_MAIL,
    //         pass: process.env.SMPT_Password
    //     }
    // });

    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false,
        auth: {
            user: 'connect@khilonaghar.com',
            pass: 'Sourabh@12'
        }
    });



    const mailOptions = {
        from: "connect@khilonaghar.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error in sending email  ' + error);
            return true;
        } else {
            console.log('Email sent: ' + info.response);
            return false;
        }
    });

};

module.exports = sendEmail;