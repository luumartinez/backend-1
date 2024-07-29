const CategoriaModel = require("../models/categorias.schema")

const traerCategorias = async () => {
    try {
        const categorias = await CategoriaModel.find()
        return {
            categorias,
            statusCode: 200
        }
    } catch (error) {
        console.log(error)
    }
}
const traerUnaCategoria = async (idCategoria) => {
    try {
        const categoria = await CategoriaModel.findById(idCategoria)
        return {
            categoria,
            statusCode: 200
        }
    } catch (error) {
        console.log(error)
    }
}
const nuevaCategoria = async (body) => {
    try {
        const categoria = new CategoriaModel(body)
        await categoria.save()
        return {
            msg: 'Categoria agregada',
            statusCode: 201
        }
    } catch (error) {
        console.log(error)
    }
}
const editarCategoria = async (idCategoria, body) => {
    try {
        const categoriaActualizada = await CategoriaModel.findByIdAndUpdate({_id: idCategoria}, body, {new:true})
        return {
            msg: 'Categoria actualizada',
            categoriaActualizada,
            statusCode: 200
        }
    } catch (error) {
        console.log(error)
    }
}
const borrarCategoria = async (idCategoria) => {
    try {
        await CategoriaModel.findByIdAndDelete({_id: idCategoria})
        return {
            msg: 'Categoria borrada',
            statusCode: 200
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    traerCategorias,
    traerUnaCategoria,
    nuevaCategoria,
    editarCategoria,
    borrarCategoria
}