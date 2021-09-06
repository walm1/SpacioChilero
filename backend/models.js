'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    title: String,
    description: String,
    price: String,
    image: String
});

var Products = mongoose.model('Products', ProductsSchema)
module.exports = Products