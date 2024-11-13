const { crearUsuario,Rol_,extraerDominioCorreo} = require("../schema/user");
const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();
const { verifyCode,verifyCodeDestroy } = require("../auth/verify");


router.post("/", async function (req, res) {
    const { email, verificationCode, name, lastname, password } = req.body;
    const dominio = await extraerDominioCorreo(email);
    let rol = Rol_(dominio);
  
    try {
        
        console.log(email, verificationCode)
      const isCodeValid = await verifyCode(email, verificationCode);
      console.log(isCodeValid)
      if (isCodeValid) {
        await crearUsuario(lastname, password, name, email,rol);
        await verifyCodeDestroy(email);
        res.status(200).json({ message: "Usuario creado exitosamente." });
      } else {
        res.status(500).json(jsonResponse(400, { error: "Código de verificación inválido." }));
      }
    } catch (err) {
      return res.status(500).json(jsonResponse(500, { error: "Error al crear el usuario." }));
    }
  });
  
  module.exports = router;