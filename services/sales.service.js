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
};
