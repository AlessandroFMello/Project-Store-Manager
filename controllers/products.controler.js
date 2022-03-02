const productsModel = require('../models/products.model');
const productsService = require('../services/products.service');

module.exports = {
  getAll: async (_req, res, _next) => {
    const allProducts = await productsModel.getAll();
  
    return res.status(200).json(allProducts);
  },
  getById: async (req, res, _next) => {
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
  update: async (req, res, _next) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const { code, message, product } = await productsService.update(id, name, quantity);
  
    if (!product) {
      return res.status(code)
        .json({ message });
    }

    return res.status(code).json(product);
  },
  exclude: async (req, res) => {
    const { id } = req.params;

    const { code, message } = await productsService.exclude(id);

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).end();
  },
};
