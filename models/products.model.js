const connection = require('./connection');

const getAll = async () => {
  const SQL_QUERY = 'SELECT * FROM StoreManager.products;';
  const [products] = await connection.execute(SQL_QUERY);
  return products;
};

const getById = async (id) => {
  const SQL_QUERY = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  
  const [productData] = await connection.execute(SQL_QUERY, [id]);

  return productData[0];
};

module.exports = {
  getAll,
  getById,
};