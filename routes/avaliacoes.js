const { Router } = require("express");

const Avaliacao = require("../models/avaliacao");
const { schemaAvaliacoes, schemaAvaliacoesPut } = require("../utils/validate/schemasAvaliacoes");
const router = Router();

router.post("/avaliacoes", schemaAvaliacoes, async (req, res) => {
    try {
        const { nota, comentario, vagaId, usuarioId } = req.body;
        if(vagaId && usuarioId){
            if(nota && comentario){
                const avaliacao = await Avaliacao.create({ nota, comentario, vagaId, usuarioId });
                res.status(201).json(avaliacao);
            }else{
                res.status(400).json({ message: "Dados inválidos." });
            }
        } else {    
            res.status(400).json({ message: "Dados inválidos." });
        }
    } 
    catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.get("/avaliacoes", async (req, res) => {
    const { id } = req.query;

    try {
        if (id) {
            const avaliacao = await Avaliacao.findByPk(id);
            if (avaliacao) {
                return res.status(200).json(avaliacao);
            } else {
                return res.status(404).json({ message: "Avaliação não encontrada. " });
            }
        }else{
            const avaliacoes = await Avaliacao.findAll();
            return res.status(200).json(avaliacoes);
        }
    } 
    catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
})

router.put("/avaliacoes/:id", schemaAvaliacoesPut, async (req, res) => {
    const { nota, comentario } = req.body;
    const avaliacao = await Avaliacao.findByPk(req.params.id);

    try {
        if (avaliacao) {
           if(nota && comentario){
            await Avaliacao.update({ nota, comentario }, { where: { id: req.params.id } });
            res.json({ message: "Avaliação editada com sucesso" });
           }else{
            res.status(400).json({ message: "Dados inválidos." });
           }
        } else {
            res.status(404).json({ message: "Avaliação não encontrada." });
        }
    } 
    catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.delete("/avaliacoes/:id", async (req, res) => {
    const avaliacao = await Avaliacao.findByPk(req.params.id);

    try {
        if (avaliacao) {
            await Avaliacao.destroy({ where: { id: req.params.id } });
            res.json({ message: "Avaliação deletada com sucesso" });
        } else {
            res.status(404).json({ message: "Avaliação não encontrada." });
        }
    } 
    catch(error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});