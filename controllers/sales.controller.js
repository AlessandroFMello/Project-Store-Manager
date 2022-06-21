const salesModel = require('../models/sales.model');
const salesService = require('../services/sales.service');

module.exports = {
  getAll: async (_req, res) => {
    const allSales = await salesModel.getAll();
  
    return res.status(200).json(allSales);
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const saleById = await salesModel.getById(id);
  
    if (!saleById || saleById.length === 0 || saleById === []) {
      return res
        .status(404).json({ message: 'Sale not found' });
    }
    
    return res.status(200).json(saleById);
  },
  create: async (req, res) => {
    const { code, sale } = await salesService.create(req.body);
  
    return res.status(code).json(sale);
  },
  update: async (req, res, _next) => {
    const { id } = req.params;
    const [body] = req.body;
    const { productId, quantity } = body;

    const { code, message, sale } = await salesService.update(id, productId, quantity);
  
    if (!sale) {
      return res.status(code)
        .json({ message });
    }

    return res.status(code).json(sale);
  },
};
