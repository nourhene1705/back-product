const Product = require("../models/ProductModel");

let ProductController = {
  ajouterProduit: async (req, res) => {
    try {
      const { name, description, price, category, stock } = req.body;

      if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({
          message: 'Tous les champs sont obligatoires.',
          success: false,
          error: true
        });
      }

      // Vérification du type de données
      if (typeof price !== 'number' || typeof stock !== 'number') {
        return res.status(400).json({
          message: 'Le prix et le stock doivent être des nombres.',
          success: false,
          error: true
        });
      }

      const nouveauProduit = new Product({
        name,
        description,
        price,
        category,
        stock
      });

      await nouveauProduit.save();

      res.status(201).json({
        message: 'Produit ajouté avec succès',
        success: true,
        error: false
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Une erreur est survenue lors de l\'ajout du produit',
        success: false,
        error: true
      });
    }
  },

  obtenirTousLesProduits: async (req, res) => {
    try {
      const produits = await Product.find();
      res.status(200).json({
        message: 'Produits récupérés avec succès',
        success: true,
        data: produits
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Une erreur est survenue lors de la récupération des produits',
        success: false,
        error: true
      });
    }
  },

  mettreAJourProduit: async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    try {
      const produitMisAJour = await Product.findByIdAndUpdate(id, {
        name,
        description,
        price,
        category,
        stock
      }, { new: true });

      if (!produitMisAJour) {
        return res.status(404).json({
          message: 'Le produit n\'existe pas',
          success: false,
          error: true
        });
      }

      res.status(200).json({
        message: 'Produit mis à jour avec succès',
        success: true,
        data: produitMisAJour
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Une erreur est survenue lors de la mise à jour du produit',
        success: false,
        error: true
      });
    }
  },

  // Supprimer un produit
  supprimerProduit: async (req, res) => {
    const { id } = req.params;

    try {
      const produitSupprime = await Product.findByIdAndDelete(id);

      if (!produitSupprime) {
        return res.status(404).json({
          message: 'Le produit n\'existe pas',
          success: false,
          error: true
        });
      }

      res.status(200).json({
        message: 'Produit supprimé avec succès',
        success: true,
        error: false
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Une erreur est survenue lors de la suppression du produit',
        success: false,
        error: true
      });
    }
  }
};

module.exports = ProductController;