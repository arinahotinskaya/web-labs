const Router = require('express');
const router = new Router();
const PurchasesController = require('../controllers/purchases.controller');

router.post('/all', PurchasesController.getAll);
router.post('/create', PurchasesController.addItem);
router.get('/user/:userId', PurchasesController.getUsers);

module.exports = router;
