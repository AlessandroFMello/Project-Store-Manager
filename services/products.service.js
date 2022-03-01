const productsModel = require('../models/products.model');

module.exports = {
  create: async ({ name, quantity }) => {
    const product = await productsModel.getProductByName(name);
  
    const checkIfNameExists = product.find((p) => p.name === name);
  
    if (checkIfNameExists) {
      return { code: 409, message: 'Product already exists' };
    }

    const newProduct = await productsModel.create(name, quantity);
  
    return { code: 201, product: newProduct };
  },
};