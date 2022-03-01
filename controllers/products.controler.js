const productsModel = require('../models/products.model');
const productsService = require('../services/products.service');

module.exports = {
  getAll: async (_req, res) => {
    const allProducts = await productsModel.getAll();
  
    return res.status(200).json(allProducts);
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const product = await productsModel.getById(id);
  
    if (!product) {
      return res
        .status(404).json({ message: 'Product not found' }); 
    }
    
    return res.status(200).json(product);
  },
  create: async (req, res, _next) => {
    const { code, message, product } = await productsService
      .create(req.body);

    if (!product) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(product);
  },
};
