const serviciosUsuarios = require("../services/usuarios.services");

const registrarUsuario = (req, res) => {
  try {
    const resultado = serviciosUsuarios.nuevoUsuario(req.body);
    if (resultado === 201) {
      res.status(201).json("Usuario registrado con éxito");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const mostrarTodosLosUsuarios = (req, res) => {
  try {
    const usuarios = serviciosUsuarios.obtenerTodosLosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json(error);
  }
};

const mostrarUsuarioXId = (req, res) => {
  try {
    const usuario = serviciosUsuarios.obtenerUsuarioXID(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Lo elimina DEFINITIVAMENTE
const bajaFisicaUsuario = (req, res) => {
  try {
    const resultado = serviciosUsuarios.eliminarUsuario(req.params.id)
    if(resultado === 200) {
      res.status(200).json({ msg: "Usuario borrado", usuarios });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//DESHABILITO UN USUARIO
const bajaLogicaUsuario = (req, res) => {
  try {
    const resultado = serviciosUsuarios.deshabilitarUsuario(req.params.idUsuario);
    res.status(200).json({ msg: resultado });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  registrarUsuario,
  mostrarTodosLosUsuarios,
  mostrarUsuarioXId,
  bajaLogicaUsuario,
  bajaFisicaUsuario,
};
