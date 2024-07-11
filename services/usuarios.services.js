const UsuarioModel = require("../models/usuarios.schema");
const bcrypt = require("bcrypt");

const nuevoUsuario = async (body) => {
  try {
    const usuarioExistente = await UsuarioModel.findOne({
      nombreUsuario: body.nombreUsuario,
    });
    if (usuarioExistente) {
      return 400;
    }
    if (body.rol !== "usuario" && body.rol !== "admin") {
      return 409;
    }
    let salt = bcrypt.genSaltSync();
    body.password = bcrypt.hashSync(body.password, salt);

    const usuario = new UsuarioModel(body);
    await usuario.save();
    return 201;
  } catch (error) {
    console.log(error);
  }
};

const inicioDeSesion = async (body) => {
  try {
    const usuarioExistente = await UsuarioModel.findOne({
      nombreUsuario: body.nombreUsuario,
    });
    if (!usuarioExistente) {
      return 400;
    }
    const validarPass = bcrypt.compareSync(
      body.password,
      usuarioExistente.password
    );
    if (validarPass) {
      return 200;
    } else {
      return 400;
    }
  } catch (error) {
    console.log(error);
  }
};

const obtenerTodosLosUsuarios = async () => {
  try {
    const usuarios = await UsuarioModel.find();
    return usuarios;
  } catch (error) {
    console.log(error);
  }
};

const obtenerUsuarioXID = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findOne({ _id: idUsuario });
    return usuario;
  } catch (error) {
    console.log(error);
  }
};

const eliminarUsuario = async (idUsuario) => {
  try {
    await UsuarioModel.findByIdAndDelete({ _id: idUsuario });
    return 200;
  } catch (error) {
    console.log(error);
  }
};

const deshabilitarUsuario = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findOne({ _id: idUsuario });
    usuario.bloqueado = !usuario.bloqueado;
    const estadoUsuario = await UsuarioModel.findByIdAndUpdate(
      { _id: idUsuario },
      usuario,
      { new: true }
    );
    return estadoUsuario.bloqueado;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  nuevoUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioXID,
  eliminarUsuario,
  deshabilitarUsuario,
  inicioDeSesion,
};
