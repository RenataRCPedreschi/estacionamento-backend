const jwt = require('jsonwebtoken');

const generateToken = (usuario, expiresIn = '30d') => {
  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn }
  );
  return token;
};

const resetToken = (email, expiresIn = '1h') => {
  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn }
  );
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  resetToken
};
