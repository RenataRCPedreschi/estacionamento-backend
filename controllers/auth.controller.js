const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/jwt.utils");

const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) return res.status(404).json({ message: "Usuário não existe." });
    if (!(await bcrypt.compare(senha, usuario.senha))) return res.status(400).json({ message: "Senha incorreta." });

    const token = generateToken(usuario);
    return res.status(200).json({ token });
  }
  catch (e) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
}

const cadastro = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario) return res.status(400).json({ message: "E-mail já cadastrado." });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const novoUsuario = await Usuario.create({ nome, email, senha: hashedPassword });
    delete novoUsuario.dataValues.password;
    return res.status(201).json(novoUsuario);
  }
  catch (e) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
}

module.exports = { login, cadastro };