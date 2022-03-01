const productsValidation = require('../schemas/products.validation');

module.exports = (req, res, next) => {
  const { error } = productsValidation.validate(req.body);

  if (error) {
    const [code, errorMessage] = error.message.split('|');
    return res.status(code).json({ message: errorMessage });
  }
  next();
};