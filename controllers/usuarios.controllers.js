const serviciosUsuarios = require("../services/usuarios.services");
const { validationResult } = require('express-validator')

const registrarUsuario = async (req, res) => {
  try {
    const {errors} = validationResult(req)
    if(errors.length){
      return res.status(400).json({msg: errors[0].msg})
    }
    const resultado = await serviciosUsuarios.nuevoUsuario(req.body);
    if (resultado === 201) {
      res.status(201).json("Usuario registrado con éxito");
    } else if (resultado === 409){
      res.status(409).json("Error al crear: rol incorrecto");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const iniciarSesion = async (req,res) =>{
  try {
    const resultado = await serviciosUsuarios.inicioDeSesion(req.body)
    if(resultado === 400){
      res.stauts(400).json("Usuario y/o contraseña inconrrecto")
    } else {
      res.status(200).json({msg: "Inicio de sesión exitoso"})
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const mostrarTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await serviciosUsuarios.obtenerTodosLosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json(error);
  }
};

const mostrarUsuarioXId = async (req, res) => {
  try {
    // const {errors} = validationResult(req)
    // if(errors.length){
    //   return res.status(400).json({msg: errors[0].msg})
    // }
    const usuario = await serviciosUsuarios.obtenerUsuarioXID(req.params.idUsuario);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Lo elimina DEFINITIVAMENTE
const bajaFisicaUsuario = async (req, res) => {
  try {
    const resultado = await serviciosUsuarios.eliminarUsuario(req.params.idUsuario)
    if(resultado === 200) {
      res.status(200).json({ msg: "Usuario borrado" });
    }
    console.log(resultado)
  } catch (error) {
    res.status(500).json(error);
  }
};

//DESHABILITO UN USUARIO
const bajaLogicaUsuario = async (req, res) => {
  try {
    const bloqueado = await serviciosUsuarios.deshabilitarUsuario(req.params.idUsuario);
    res.status(200).json({msg: 'Estado del usuario', bloqueado});
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
  iniciarSesion
};
