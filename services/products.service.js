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
  update: async (id, name, quantity) => {
    const getProductById = await productsModel.getById(id);

    if (getProductById) {
      const productToUpdade = await productsModel.update(id, name, quantity);
      return { code: 200, product: productToUpdade };
    }
    return { code: 404, message: 'Product not found' };
  },
  exclude: async (id) => {
    const productToExclude = await productsModel.exclude(id);
  
    if (!productToExclude.affectedRows) {
      return { code: 404, message: 'Product not found' };
    }
    return { code: 204 };
  },
};