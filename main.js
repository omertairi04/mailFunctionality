const nodemailer = require("nodemailer");

clientEmail = "client-email";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "email",
    pass: "password", // password
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(clientEmail) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"AccountX " <${clientEmail}>`, // sender address
    to: `${clientEmail}`, // list of receivers
    subject: "Password Reset", // Subject line
    html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p style="color: #333;">Hello,</p>
            <p style="color: #333;">You are receiving this email because a password reset request was made for your account. If you did not make this request, you can safely ignore this email.</p>
            <p style="color: #333;">To reset your password, please click the following link:</p>
            <a href="http://yourwebsite.com/reset-password?token=your_reset_token" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Reset Password</a>
            <p style="color: #333;">If you're having trouble clicking the link, you can copy and paste the following URL into your browser:</p>
            <p style="color: #333;">http://yourwebsite.com/reset-password?token=your_reset_token</p>
            <p style="color: #333;">Thank you,</p>
            <p style="color: #333;">AccountX Team</p>
        </div>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main(clientEmail).catch(console.error);
