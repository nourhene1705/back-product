const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth"); 
const verifyRole = require("../middleware/permission");  
const ProductCtrl = require("../controllers/ProductCtrl");

router.post("/", verifyToken, verifyRole('admin'), ProductCtrl.ajouterProduit);

router.get("/", ProductCtrl.obtenirTousLesProduits);

router.put("/:id", verifyToken, verifyRole('admin'), ProductCtrl.mettreAJourProduit);

router.delete("/:id", verifyToken, verifyRole('admin'), ProductCtrl.supprimerProduit);

module.exports = router;
