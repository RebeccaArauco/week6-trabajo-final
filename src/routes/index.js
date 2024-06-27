const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const router = express.Router();

// insert routes here
router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)

module.exports = router;