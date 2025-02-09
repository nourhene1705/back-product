const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");

const verifyRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token || req.headers["authorization"];
      if (!token) {
        return res.status(403).json({ message: "Accès interdit, token manquant" });
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Token invalide ou expiré" });
        }
        return decoded;
      });

      if (!decoded) {
        return res.status(403).json({ message: "Token invalide ou expiré" });
      }

      const admin = await Admin.findById(decoded._id);
      if (!admin) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Vérification du rôle de l'admin
      if (requiredRole === "admin" && admin.role !== "admin") {
        return res.status(403).json({ message: "Accès interdit, permissions insuffisantes" });
      }

      req.user = admin;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message || "Une erreur est survenue" });
    }
  };
};

module.exports = verifyRole;


