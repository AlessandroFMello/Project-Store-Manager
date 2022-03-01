const sales = require('../models/sales.model');

module.exports = {
  getAll: async (_req, res) => {
    const allSales = await sales.getAll();
  
    return res.status(200).json(allSales);
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const sale = await sales.getById(id);
  
    if (!sale || sale.length === 0 || sale === []) {
      return res
        .status(404).json({ message: 'Sale not found' });
    }
    
    return res.status(200).json(sale);
  },
};
