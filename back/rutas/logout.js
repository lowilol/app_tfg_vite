const express = require("express");
const router = express.Router();
const Token = require("../schema/token");
const validateToken = require("../auth/validateToken");

router.delete("/", async function (req, res, next) {
  try {
    
  } catch (ex) {
    return next(new Error("Error loging out the user " + ex.message));
  }
});

module.exports = router;