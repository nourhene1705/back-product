const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.admin.role !== role) {
      return res.status(403).json({ message: "Accès interdit, rôle insuffisant" });
    }
    next();
  };
};

module.exports = verifyRole;



