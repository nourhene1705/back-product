const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Accès interdit, token manquant" });
  }

  try {
    const decoded = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide" });
  }
};

module.exports = verifyToken;