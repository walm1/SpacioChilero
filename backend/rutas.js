'use strict'

var ProductController = require('./controllers')
var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty')
var mdMultiparty = multipart({uploadDir: './upload/products'})

router.get('/test', ProductController.test);
router.get('/products', ProductController.getProducts);
router.get('/product/:id?', ProductController.getProduct);
router.get('/get-image/:image', ProductController.getImage);
router.post('/save', ProductController.saveProduct);
router.post('/upload/:id', mdMultiparty, ProductController.uploadImages);
router.put('/update/:id', ProductController.updateProduct)
router.delete('/delete/:id', ProductController.deleteProduct);

module.exports = router