const connection = require('./connection');

const getAll = async () => {
  const SQL_QUERY = 'SELECT * FROM StoreManager.products;';
  const [productsList] = await connection.execute(SQL_QUERY);
  return productsList;
};

const getById = async (id) => {
  const SQL_QUERY = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  
  const [productData] = await connection.execute(SQL_QUERY, [id]);

  return productData[0];
};

const getProductByName = async (name) => {
  const SQL_QUERY = 'SELECT * FROM StoreManager.products WHERE name = ?';

  const [result] = await connection.execute(SQL_QUERY, [name]);

  return result;
};

const create = async (name, quantity) => {
  const SQL_QUERY = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';

  const [newProduct] = await connection.execute(
    SQL_QUERY,
    [name, quantity],
  );

  const createdProduct = {
    id: newProduct.insertId,
    name,
    quantity,
  };

  return createdProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  getProductByName,
};