const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "natthasit.muka@gmail.com",
    pass: "Satang@090144",
  },
});

module.exports = transporter;