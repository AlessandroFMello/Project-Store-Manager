const salesModel = require('../models/sales.model');

module.exports = {
  create: async (sales) => {
    const saleId = await salesModel.createId();

    sales.forEach(async ({ productId, quantity }) => {
      await salesModel.create(saleId, productId, quantity);
    });

    return {
      code: 201,
      sale: {
        id: saleId,
        itemsSold: sales,
      },
    };
  },
  update: async (saleId, productId, quantity) => {
    const getSaleById = await salesModel.getById(productId);

    if (!getSaleById) {
      return { code: 404, message: 'Sale not found' };
    }
    await salesModel.update(saleId, productId, quantity);
    return {
      code: 200,
      sale: {
        saleId,
        itemUpdated: [{
          productId,
          quantity,
        }],
      },
    };
  },
};
