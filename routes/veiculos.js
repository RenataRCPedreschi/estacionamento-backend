const { Router } = require("express");
const Veiculo = require("../models/veiculo");

const router = Router();

router.get("/veiculos", async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const veiculo = await Veiculo.findByPk(id);
      if (veiculo) {
        return res.status(200).json(veiculo);
      }
      else {
        return res.status(404).json({ message: "Veículo não encontrado." });
      }
    }
    const veiculos = await Veiculo.findAll();
    return res.status(200).json(veiculos)
  }
  catch (error) {
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.post("/veiculos", async (req, res) => {
  const { placa, modelo, cor, usuarioId } = req.body;

  try {
    const veiculo = await Veiculo.create({ placa, modelo, cor, usuarioId });
    res.status(201).json(veiculo);
  }
  catch (error) {
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.put("/veiculos/:id", async (req, res) => {
  const { placa, modelo, cor, usuarioId } = req.body;
  const { id } = req.params;

  try {
    const veiculo = await Veiculo.findByPk(id);
    if (veiculo) {
      await veiculo.update({ placa, modelo, cor, usuarioId });
      return res.status(200).json({ message: "Veículo editado." });
    }
    else {
      return res.status(404).json({ message: "Veículo não encontrado." });
    }
  }
  catch (error) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.delete("/veiculos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const veiculo = await Veiculo.findByPk(id);
    if (veiculo) {
      await veiculo.destroy();
      return res.status(200).json({ message: "Veículo deletado." })
    }
    else {
      return res.status(404).json({ message: "Veículo não encotrado" });
    }
  }
  catch (error) {
    return res.status(500).json({ message: "Ocorreu um erro." })
  }
})

module.exports = router;