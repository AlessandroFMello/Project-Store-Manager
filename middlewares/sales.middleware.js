const salesValidation = require('../schemas/sales.validation');

module.exports = (req, res, next) => {
  const [body] = req.body;
  const { error } = salesValidation.validate(body);

  if (error) {
    const [code, errorMessage] = error.message.split('|');
    return res.status(code).json({ message: errorMessage });
  }
  next();
};