const { verify } = require('jsonwebtoken');
const { getAll, create, getOne, remove, update, setImages } = require('../controllers/product.controllers');
const express = require('express');

const routerProduct = express.Router();

routerProduct.route('/')
    .get(getAll)
    .post(verify, create);
/*
routerUser.route('/:id/images')
    .post(verify, setImages)*/

routerProduct.route('/:id')
    .get(getOne)
    .delete(verify, remove)
    .put(verify, update);

module.exports = routerProduct;