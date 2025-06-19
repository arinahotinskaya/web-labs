const Router = require('express');
const router = new Router();
const ItemsController = require('../controllers/items.controller');

router.get('/get/:id', ItemsController.getById);
router.get('/all', ItemsController.getAll);
router.post('/create', ItemsController.addItem);

module.exports = router;
