const Product = require("../models/ProductModel");
let ProductController = {
  addProduct: async (req, res) => {
    try {
      const { name, description, price, category, stock } = req.body;

      if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({
          message: 'Tous les champs sont obligatoires.',
          success: false,
          error: true
        });
      }

      const newProduct = new Product({
        name,
        description,
        price,
        category,
        stock
      });

      await newProduct.save();

      res.status(201).json({
        message: 'Produit ajouté avec succès',
        success: true,
        error: false
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || error,
        success: false,
        error: true
      });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        message: 'Produits récupérés avec succès',
        success: true,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || error,
        success: false,
        error: true
      });
    }
  }
};

module.exports = ProductController;


