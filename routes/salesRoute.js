const router = require('express').Router();
const controller = require('../controllers/sales.controller');
const salesValidationMiddleware = require('../middlewares/sales.middleware');

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post(
  '/',
// salesValidationMiddleware,
controller.create,
);

router.put('/:id', salesValidationMiddleware, () => {});

module.exports = router;