const serviciosCategorioas = require("../services/categorias.services");

const obtenerCategorias = async (req, res) => {
  try {
    const resultado = await serviciosCategorioas.traerCategorias();
    if (resultado.statusCode === 200) {
      res.status(200).json(resultado.categorias);
    }
  } catch (error) {
    console.log(error);
  }
};
const obtenerUnaCategoria = async (req, res) => {
  try {
    const resultado = await serviciosCategorioas.traerUnaCategoria(
      req.params.idCategoria
    );
    if (resultado.statusCode === 200) {
      res.status(200).json(resultado.categoria);
    }
  } catch (error) {
    console.log(error);
  }
};
const crearCategoria = async (req, res) => {
  try {
    const resultado = await serviciosCategorioas.nuevaCategoria(req.body);
    if (resultado.statusCode === 201) {
      res.status(201).json({ msg: resultado.msg });
    }
  } catch (error) {
    console.log(error);
  }
};
const actualizarCategoria = async (req, res) => {
  try {
    const resultado = await serviciosCategorioas.editarCategoria(
      req.params.idCategoria,
      req.body
    );
    if (resultado.statusCode === 200) {
      res
        .status(200)
        .json({ msg: resultado.msg });
    }
  } catch (error) {
    console.log(error);
  }
};
const eliminarCategoria = async (req, res) => {
  try {
    const resultado = await serviciosCategorioas.borrarCategoria(
      req.params.idCategoria
    );
    if (resultado.statusCode === 200) {
      res.status(200).json({ msg: resultado.msg });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  obtenerCategorias,
  obtenerUnaCategoria,
  crearCategoria,
  eliminarCategoria,
  actualizarCategoria,
};
