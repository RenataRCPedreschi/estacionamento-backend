const Usuario = require("../models/usuario");
const { verifyToken } = require("../utils/jwt.utils");

function authMiddleware() {
  return async (req, res, next) => {

    const authorization = req.headers.authorization;

    try {
      if (!authorization) return res.status(401).json({ message: "Cabeçalho não configurado." });
      const [authType, token] = authorization.split(" ");
      if (authType !== "Bearer") return res.status(401).json({ error: "Tipo de autenticação não permitida." });
      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ message: "Token inválido." });
      const usuario = await Usuario.findByPk(decoded.id)
      if (!usuario) return res.status(404).json({ message: "Usuário fornecido no token não foi encontrado." });
      req.auth = decoded;
      return next();
    }
    catch (e) {
      return res.status(500).json({ message: "Ocorreu um erro." });
    }
  }
}

module.exports = authMiddleware;