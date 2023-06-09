const { Router } = require("express");
const Vaga = require("../models/vaga");
const authMiddleware = require("../middlewares/auth.middleware");
const { schemaVagas, schemaVagasPut } = require("../utils/validate/schemasVagas");

const router = Router();

router.post("/vagas", schemaVagas, authMiddleware(), async (req, res) => {
    try {
        const { localizacao, preco, tipo, status } = req.body;
        const vaga = await Vaga.create({ localizacao, preco, tipo, status });

        res.status(201).json(vaga);
    } 
    catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.get("/vagas", authMiddleware(), async (req, res) => {
    const { id } = req.query;

    try {
        if (id) {
            const vaga = await Vaga.findByPk(id);
            if (vaga) {
                return res.status(200).json(vaga);
            } else {
                return res.status(404).json({ message: "Vaga não encontrada. " });
            }
        }

        const vagas = await Vaga.findAll();
        return res.status(200).json(vagas);
    } 
    catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.put("/vagas/:id", schemaVagasPut, authMiddleware(), async (req, res) => {
    const { localizacao, preco, tipo, status } = req.body;
    const vaga = await Vaga.findByPk(req.params.id);

    try {
        if (vaga) {
            await Vaga.update({ localizacao, preco, tipo, status }, { where: { id: req.params.id } });
            res.json({ message: "Vaga editada com sucesso!" });
        } else {
            res.status(404).json({ message: "Vaga não encontrada." });
        }
    } 
    catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.delete("/vagas/:id", authMiddleware(), async (req, res) => {
    const vaga = await Vaga.findByPk(req.params.id);

    try {
        if (vaga) {
            await vaga.destroy();
            res.json({ message: "Vaga removida com sucesso!" });
        } else {
            res.status(404).json({ message: "Vaga não encontrada." });
        }
    } catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;