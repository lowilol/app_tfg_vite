const jwt = require("jsonwebtoken");
require("dotenv").config();
const transporter = require('../config/email');  
const sequelize = require('../config/connection');
const fs = require('fs');
const path = require('path');

const crypto = require('crypto');
const VerificationCode = require('../models/VerificationCode');

async function verifyAccessToken(token) {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded;
}



 function verifyResetPasswordToken(token) {
  const decoded = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN);
  return decoded;
}


async function generateVerificationCode(email) {
  const code = crypto.randomInt(100000, 999999).toString(); // Código de 6 dígitos
  await sequelize.sync();
  // Almacenar el código en la base de datos con un tiempo de expiración
  await VerificationCode.create({
    email,
    code,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000), // Expira en 15 minutos
  });

  return code;
}


async function sendVerificationEmail(email, verificationCode) {
  const emailTemplatePath = path.join(__dirname, '../templates/email_verify_code.html');
  let emailTemplate = fs.readFileSync(emailTemplatePath, { encoding: 'utf-8' });
  emailTemplate = emailTemplate.replace('${verificationCode}', verificationCode);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Código de Verificación',
    html:emailTemplate ,
  };

  await transporter.sendMail(mailOptions);
}


async function verifyCode(email, code) {
  
  const verificationRecord = await VerificationCode.findOne({
    where: { email, code },
  });
  console.log("pipi:" +verificationRecord )
  if (verificationRecord === null) {
    return false;
  }

 
  if (verificationRecord.expiresAt < new Date()) {
    res.status(500).json(jsonResponse(400, { error: "Código de verificación Expirado." }));
    return false;
  }
  

  return true;
}


const verifyCodeDestroy = async (email) => {
  await VerificationCode.destroy({ where: { email } });

}

module.exports = {verifyCodeDestroy , verifyAccessToken, verifyResetPasswordToken ,generateVerificationCode,sendVerificationEmail,verifyCode  };