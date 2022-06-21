const connection = require('./connection');

module.exports = {
  getAll: async () => {
    const SQL_QUERY = `SELECT sale_id AS saleId, date, product_id AS productId, quantity 
    FROM StoreManager.sales_products AS salesProducts 
    INNER JOIN StoreManager.sales AS sales 
    ON sales.id = salesProducts.sale_id;`;
    const [sales] = await connection.execute(SQL_QUERY);
    return sales;
  },  
  getById: async (id) => {
    const SQL_QUERY = `SELECT date, product_id AS productId, quantity 
    FROM StoreManager.sales_products AS salesProducts 
    INNER JOIN StoreManager.sales AS sales 
    ON sales.id = salesProducts.sale_id WHERE id = ?;`;
    const [saleData] = await connection.execute(
      SQL_QUERY,
      [id],
      );
  
    return saleData;
  },
  createId: async () => {
    const SQL_QUERY = 'INSERT INTO StoreManager.sales () VALUES ();';
    const [sale] = await connection.execute(SQL_QUERY);

    return sale.insertId;
  },  
  create: async (saleId, productId, quantity) => {
    const SQL_QUERY = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`;
    await connection.execute(
      SQL_QUERY,
      [saleId, productId, quantity],
    );
  },
  update: async (saleId, productId, quantity) => {
    const SQL_QUERY = `UPDATE StoreManager.sales_products 
    SET quantity = ? WHERE sale_id = ? AND product_id = ?;`;
    const saleToUpdate = await connection.execute(
      SQL_QUERY,
      [quantity, saleId, productId],
    );
  
    return saleToUpdate;
  },
};