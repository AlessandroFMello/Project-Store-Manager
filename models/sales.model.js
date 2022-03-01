const connection = require('./connection');

const getAll = async () => {
  const SQL_QUERY = `SELECT sale_id AS saleId, date, product_id AS productId, quantity 
  FROM StoreManager.sales_products AS salesProducts 
  INNER JOIN StoreManager.sales AS sales 
  ON sales.id = salesProducts.sale_id;`;
  const [sales] = await connection.execute(SQL_QUERY);
  return sales;
};

const getById = async (id) => {
  const SQL_QUERY = `SELECT date, product_id AS productId, quantity 
  FROM StoreManager.sales_products AS salesProducts 
  INNER JOIN StoreManager.sales AS sales 
  ON sales.id = salesProducts.sale_id WHERE id = ?;`;
  const [saleData] = await connection.execute(
    SQL_QUERY,
    [id],
    );

  return saleData;
};

module.exports = {
  getAll,
  getById,
};