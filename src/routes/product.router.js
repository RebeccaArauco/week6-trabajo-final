const { getAll, create, getOne, remove, update, setImages } = require('../controllers/product.controllers');
const express = require('express');

const routerProduct = express.Router();

routerProduct.route('/')
    .get(getAll)
    .post(create);

routerUser.route('/:id/images')
    .post(setImages)

routerProduct.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerProduct;