const nodemailer = require('nodemailer');
const httpError = require('./httpError');
require('dotenv').config();

const { EMAIL_USER, EMAIL_PASSWORD, SMTP_SERVER_ADDRESS, SMTP_SERVER_PORT, BASE_URL } = process.env;

const mailerOptions = {
  host: SMTP_SERVER_ADDRESS,
  port: +SMTP_SERVER_PORT,
  secure: true,
  auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
};

const transporter = nodemailer.createTransport(mailerOptions);

const sendEmail = async ({ email, verificationToken }) => {
  try {
    const emailData = {
      from: EMAIL_USER,
      to: email,
      subject: 'Email verification',
      html: `<p>Please verify your email <a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click here to verify</a> </p>`,
    };

    const info = await transporter.sendMail(emailData);
    if (info.accepted) return true;
    else return false;
  } catch (error) {
    throw httpError(500, error.message);
  }
};

module.exports = sendEmail;
