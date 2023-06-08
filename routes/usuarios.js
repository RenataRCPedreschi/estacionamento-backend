const { Router } = require("express");
const Usuario = require("../models/usuario");
const authMiddleware = require("../middlewares/auth.middleware");
const bcrypt = require('bcryptjs');

const router = Router();

router.get("/usuarios", authMiddleware(), async (req, res) => {
    const { id } = req.query;
    try {
        if (id) {
            const usuario = await Usuario.findByPk(id);
            if (usuario) {
                return res.status(200).json(usuario);
            } else {
                return res.status(404).json({ message: "Usuário não encontrado. " });
            }
        }

        const usuarios = await Usuario.findAll();
        return res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.put("/usuarios/:id", authMiddleware(), async (req, res) => {
    const { nome, email } = req.body;
    let { senha } = req.body;
    const saltRounds = 10;

    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            if (req.auth.id !== req.params.id) return res.status(404).json({ message: "Usuário editado deve ser o mesmo logado." });
            if (senha) {
                const hashedPassword = await bcrypt.hash(senha, saltRounds);
                senha = hashedPassword;
            }
            await Usuario.update({ nome, email, senha }, { where: { id: req.params.id } });
            return res.json({ message: "Usuário editado com sucesso!" });
        } else {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.delete("/usuarios/:id", authMiddleware(), async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);

    try {
        if (usuario) {
            await usuario.destroy();
            res.json({ message: "Usuário removido com sucesso!" });
        } else {
            res.status(404).json({ message: "Usuário não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;