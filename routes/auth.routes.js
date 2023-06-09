const authController = require("../controllers/auth.controller");
const express = require("express");
const { Router } = require("express");
const { schemaUsuario } = require("../utils/validate/schemasUsuarios");

const router = Router();

router.post("/cadastro", schemaUsuario, authController.cadastro);
router.post("/login", authController.login);

module.exports = router;

