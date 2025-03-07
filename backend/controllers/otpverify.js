// server.js
const nodemailer = require('nodemailer');


// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host : 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: "santoshallu1234@gmail.com",
      pass: "spufdfwtjmtkhoqr",
    }
  });
//hello
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const mailOptions = {
    from: 'santoshallu1234@gmail.com',
    to: email,
    subject: 'Your Exohandle OTP Code',
    text: `Dear user,\n\nYour OTP for CoderHabit is: ${otp}\n\nThank you,\nThe CoderHabit Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    // Store OTP in a database or in-memory storage for verification
    // For simplicity, you can return it in the response (not recommended for production)
    res.status(200).json({ otp });
  });
};





