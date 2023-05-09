const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/send-email", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Ошибка при отправке электронной почты");
    } else {
      console.log("Email отправлен: " + info.response);
      res.send("Email успешно отправлен");
    }
  });
});

app.listen(1337, () => {
  console.log("Сервер запущен на порту 1337");
});
