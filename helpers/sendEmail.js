const nodemailer = require('nodemailer');
const { emailService, emailAuthUser, emailAuthPass } = require('../config/config');

function sendEmail(to, subject, link) {
  const transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailAuthUser,
      pass: emailAuthPass,
    },
  });

  const mailOptions = {
    from: '',
    to: to,
    subject: subject,
    html: 'the reset password link will go here',
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail,
};
