const { Router } = require("express");
const Registro = require("../models/registro");
const authMiddleware = require("../middlewares/auth.middleware");
const { schemasRegistros, schemasRegistrosPut } = require("../utils/validate/schemasRegistros");

const router = Router();

router.post("/registros", schemasRegistros, authMiddleware(), async (req, res) => {
    try {
        const { data_inicio, data_fim, vagaId, usuarioId } = req.body;
        if (vagaId && usuarioId) {
            if (data_inicio && data_fim) {
                const registro = await Registro.create({ data_inicio, data_fim, vagaId, usuarioId });
                res.status(201).json(registro);
            } else {
                res.status(400).json({ message: "Data inválida." });
            }
        } else {
            res.status(400).json({ message: "Dados inválidos." });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.get("/registros", authMiddleware(), async (req, res) => {
    const { id } = req.query;

    try {
        if (id) {
            const registro = await Registro.findByPk(id);
            if (registro) {
                return res.status(200).json(registro);
            } else {
                return res.status(404).json({ message: "Registro não encontrado. " });
            }
        } else {
            const registros = await Registro.findAll();
            return res.status(200).json(registros);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.put("/registros/:id", schemasRegistrosPut ,authMiddleware(), async (req, res) => {
    const { data_inicio, data_fim } = req.body;
    const registro = await Registro.findByPk(req.params.id);

    try {
        if (registro) {
            if (data_inicio, data_fim) {
                await Registro.update({ data_inicio, data_fim }, { where: { id: req.params.id } });
                res.json({ message: "Registro editado com sucesso" });
            } else {
                res.status(400).json({ message: "Data inválida." });
            }
        } else {
            res.status(404).json({ message: "Registro não encontrado." });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.delete("/registros/:id", authMiddleware(), async (req, res) => {
    const registro = await Registro.findByPk(req.params.id);

    try {
        if (registro) {
            await registro.destroy();
            res.json({ message: "Registro removido com sucesso!" });
        } else {
            res.status(404).json({ message: "Registro não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;