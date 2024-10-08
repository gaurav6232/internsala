const nodemailer = require("nodemailer");

exports.sendmail = (req, res, next, url) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        post: 465,
        auth: {
            user: process.env.MAIL_EMAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD,
        }
    })

    const mailoptions = {
        from: "Master Pvt. Ltd.",
        to: req.body.email,
        subject: "password Reset Link",
        html: `<h1> click link blow to reset password</h1>
         <a href="${url}">password Reset Link</a>`
    };

    transport.sendMail(mailoptions, (err, info) =>{
        if (err) return next(new ErorrHandler("err",  500));

        console.log(info);
        return res.status(200).json({
            message: "mail sent successfully",
            url,
        })

    })
}