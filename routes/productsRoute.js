const router = require('express').Router();

const controller = require('../controllers/products.controler');

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

module.exports = router;