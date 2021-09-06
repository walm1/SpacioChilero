'use strict'

const Products = require('./models')
const validator = require('validator')
var path = require('path')
var fs = require('fs')

const ProductController = {

    test: (req, res)=>{
        return res.send('si')
    },

    saveProduct: (req,res) =>{
        var title = req.body.title;
        var description = req.body.description;
        var price = req.body.price

        try{
            var validateTitle = !validator.isEmpty(title);
            var validateDescription = !validator.isEmpty(description);
            var validatePrice = !validator.isEmpty(price);
        }catch(err){
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'error al validar datos'
                })
            }
        }

        if(validateTitle && validateDescription && validatePrice){
             var products = new Products();
              products.title = title
              products.description = description
              products.price = price
              products.image = null
             
             products.save((err, productStored)=>{
                 if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'error al validar datos'
                    })
                 }
                else if(!productStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'error al guardar'
                    })
                 }

                 return res.status(200).send({
                     status: 'success',
                     product: productStored
                 })
             })
        }
    },

    deleteProduct: (req, res)=>{
        var productId = req.params.id;

        Products.findByIdAndDelete(productId, (err, productDeleted)=>{
            if(err || !productDeleted){
                return res.status(500).send({
                    status: 'error',
                    message: 'error al eliminar producto'
                })
            }
            return res.status(200).send({
                status: 'success',
                product: productDeleted
            })
        })
    },

    getProducts: (req, res)=>{
        Products.find({}, (err, products)=>{
            if(err || !products){
                return res.status(500).send({
                    status: 'error',
                    message: 'error al encontrar producto'
                })
            }

            return res.status(200).send({
                status: 'success',
                product: products
            })
        })
    },
    getProduct: (req, res)=>{
        var productId = req.params.id;

        Products.findById(productId, (err, product)=>{
            if(err || !product){
                return res.status(500).send({
                    status: 'error',
                    message: 'error al encontrar producto'
                })
            }

            return res.status(200).send({
                status: 'success',
                product: product
            })
        })
    },

    updateProduct: (req, res)=>{
        var productId = req.params.id;
        var params = req.body;

        Products.findByIdAndUpdate(productId,  params, {new: true}, (err, productUpdated)=>{

            if(err || !productUpdated){
                return res.status(500).send({
                    status: 'error',
                    message: 'error al actualizar producto'
                })
            }

            return res.status(200).send({
                status: 'success',
                product: productUpdated
            })
        })
    },

    uploadImages: (req, res)=>{
        var fileName = 'imagen no subida' 
        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: fileName
            })
        }
        var filePath = req.files.file0.path
        var fileSplit = filePath.split('\\')
        var fileName = fileSplit[2]
        var fileExt = fileName.split('\.')
        var fileExt1 = fileExt[1]

        if(fileExt1 != 'jpg' && fileExt1 != 'png' && fileExt1 != 'gif' && fileExt1 != 'jpeg'){
            fs.unlink(filePath, (err) =>{
                return res.status(200).send({
                    status: 'error',
                    message: 'la extension no es valida'
                })
            })
        }else{
            var productId = req.params.id
            Products.findByIdAndUpdate(productId, {image: fileName}, {new: true}, (err, productUpdated)=>{
                if(err || !productUpdated){
                    return res.status(500).send({
                        status: 'error',
                        message: 'error al subir la imagen'
                    })
                }

                return res.status(200).send({
                    status: 'success',
                    product: productUpdated
                })
            })

        }
    },

    getImage: (req, res)=>{
        var imageId = req.params.image
        var pathFile = './upload/products/'+imageId;
        fs.exists(pathFile, (stat)=>{
            if(stat){
                return res.sendFile(path.resolve(pathFile))
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'la imagen no existe'
                })
            }
        })
    }
}

module.exports = ProductController