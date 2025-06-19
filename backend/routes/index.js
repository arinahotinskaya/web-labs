const Router = require('express');
const router = new Router();

const AuthRouter = require('./auth.router');
const ItemsRouter = require('./items.router');
const PurchasesRouter = require('./purchases.router');

router.use('/auth', AuthRouter);
router.use('/items', ItemsRouter);
router.use('/purchase', PurchasesRouter);

module.exports = router;
