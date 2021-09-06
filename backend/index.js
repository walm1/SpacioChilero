'use strict'

const Mongoose = require('mongoose')
const app = require('./app')
const port = 3080

const server = app.get('/', (req,res)=>{
    console.log('servidor corriendo')
})

Mongoose.connect('mongodb://localhost:27017/spaciochilero', {useNewUrlParser: true, 
useUnifiedTopology: true
}).then(()=>{
    console.log('coneccion hecha correctamente')
})


server.listen(port)