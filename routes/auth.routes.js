const authController = require("../controllers/auth.controller");
const express = require("express");
const { Router } = require("express");

const router = Router();

router.post("/cadastro", authController.cadastro);
router.post("/login", authController.login);

module.exports = router;

