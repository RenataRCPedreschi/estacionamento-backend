const { Router } = require("express");
const Usuario = require("../models/usuario");

const router = Router();

router.post("/usuarios", async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const usuario = await Usuario.create({ nome, email, senha });

        res.status(201).json(usuario);
    } 
    catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.get("/usuarios", async (req, res) => {
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
    catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.put("/usuarios/:id", async (req, res) => {
    const { nome, email, senha } = req.body;
    const usuario = await Usuario.findByPk(req.params.id);

    try {
        if (usuario) {
            await Usuario.update({ nome, email, senha }, { where: { id: req.params.id } });
            res.json({ message: "Usuário editado com sucesso!" });
        } else {
            res.status(404).json({ message: "Usuário não encontrado." });
        }
    } 
    catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.delete("/usuarios/:id", async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);

    try {
        if (usuario) {
            await usuario.destroy();
            res.json({ message: "Usuário removido com sucesso!" });
        } else {
            res.status(404).json({ message: "Usuário não encontrado." });
        }
    } catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;