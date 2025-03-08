const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/AdminModel");
const User = require("../models/User");

const AdminCtrl = {

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const findAdmin = await Admin.findOne({ email });

      if (!findAdmin) {
        return res.status(401).json({ message: "L'email est incorrect" });
      }
      const compare = await bcrypt.compare(password, findAdmin.password);
      if (!compare) {
        return res.status(401).json({ message: "Le mot de passe est incorrect" });
      }

     
      const token = jwt.sign(
        { _id: findAdmin._id, email: findAdmin.email},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2h" }
      );
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
        .status(200)
        .json({ message: "Connexion réussie", token, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },

 
  logout: (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Déconnexion réussie", success: true });
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

getAllUsers: async (req, res) => {
  try {
    const users = await User.find(); 
    const emails = users.map(user => user.email); 
    res.json({ emails });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching users" });
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

