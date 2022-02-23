const products = require('../models/products.model');

module.exports = {
  getAll: async (_req, res) => {
    const allProducts = await products.getAll();
  
    return res.status(200).json(allProducts);
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const product = await products.getById(id);
  
    if (!product) {
      return res
        .status(404).json({ message: 'Product not found' }); 
    }
    
    return res.status(200).json(product);
  },
};
