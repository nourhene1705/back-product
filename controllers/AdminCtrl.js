let Admin = require ("../models/AdminModel")
let bcrypt = require ("bcrypt")
const AdminCtrl = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;

      let findAdmin = await Admin.findOne({ email });

      if (!findAdmin) {
        return res.status(401).json({ message: "L'email est incorrect" });
      }

      let compare = await bcrypt.compare(password, findAdmin.password);

      if (!compare) {
        return res.status(401).json({ message: "Le mot de passe est incorrect" });
      }

      const tokenData = {
        _id: findAdmin._id,
        email: findAdmin.email,
      };

      const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 60 * 60 * 2,
      });

      const tokenOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
      };

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Connexion réussie",
        data: token,
        success: true,
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || error,
        success: false,
        error: true,
      });
    }
  },

  logout: (req, res) => {
    res.clearCookie("token").status(200).json({
      message: "Déconnexion réussie",
      success: true,
      error: false,
    });
  },

  addAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      let existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin existe déjà" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({ email, password: hashedPassword });

      await newAdmin.save();
      res.status(201).json({ message: "Admin ajouté avec succès", success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },

  getAllAdmins: async (req, res) => {
    try {
      const admins = await Admin.find();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      const updateData = { email };
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      await Admin.findByIdAndUpdate(id, updateData);
      res.status(200).json({ message: "Admin mis à jour avec succès" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      await Admin.findByIdAndDelete(id);
      res.status(200).json({ message: "Admin supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = AdminCtrl;

