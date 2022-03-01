const router = require('express').Router();
const controller = require('../controllers/products.controler');
const productsValidationMiddleware = require('../middlewares/products.middleware');

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post(
  '/',
  productsValidationMiddleware, controller.create,
);

router.put('/:id', productsValidationMiddleware, () => {});

module.exports = router;