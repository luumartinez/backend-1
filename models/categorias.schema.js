const { Schema, model } = require('mongoose')

const categoriaSchema = new Schema({
    nombre:{
        type: String,
        require: true,
        unique: true
    }
})

const CategoriaModel = model('category', categoriaSchema)
module.exports = CategoriaModel