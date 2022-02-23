const sales = require('../models/sales.model');

module.exports = {
  getAll: async (_req, res) => {
    const actors = await sales.getAll();
  
    return res.status(200).json(actors);
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const sale = await sales.getById(id);
  
    if (!sale) {
      return res
        .status(404).json({ message: 'Sale not found' });
    }
    
    return res.status(200).json(sale);
  },
};
