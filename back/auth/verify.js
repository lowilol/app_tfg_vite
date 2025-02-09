const jwt = require("jsonwebtoken");
require("dotenv").config();
const transporter = require('../config/email');  
const sequelize = require('../config/connection');
const fs = require('fs');
const path = require('path');

const crypto = require('crypto');
const VerificationCode = require('../models/VerificationCode');
const redis = require("../config/redis");

async function verifyAccessToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!req || !req.headers) {
      return res.status(400).json({ error: 'Solicitud malformada' });
    }

    
    if (!authHeader) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;  
    next();  
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}



 function verifyResetPasswordToken(token) {
  const decoded = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN);
  return decoded;
}


async function generateVerificationCode(email) {
  const code = crypto.randomInt(100000, 999999).toString();
  saveVerificationCode(email,code)
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





async function saveVerificationCode(email, code) {
  const key = `verification:${email}`;
  await redis.set(key, code, "EX", 600); 
  console.log("key: "+ key + "email: " + email)
}


async function verifyCode(email, code) {
  const key = `verification:${email}`;
  const storedCode = await redis.get(key);
  console.log("verificar codigo redis: "+ storedCode + "clave: "+ key)
  return storedCode === code;
}


async function verifyCodeDestroy(email) {
  const key = `verification:${email}`;
  await redis.del(key);
  console.log("destruido con clave: " + key  )
}





module.exports = {
  verifyCodeDestroy,
  verifyAccessToken,
  verifyResetPasswordToken,
  generateVerificationCode,
  sendVerificationEmail,
  verifyCode,
  saveVerificationCode  };