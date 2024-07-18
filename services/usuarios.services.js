const UsuarioModel = require("../models/usuarios.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registroUsuario } = require("../helpers/mensajes");
const CarritoModel = require("../models/carrito.schema");
const FavModel = require("../models/favoritos.schema");

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

    registroUsuario()
    const usuario = new UsuarioModel(body);
    const carrito = new CarritoModel({idUsuario: usuario._id})
    const fav = new FavModel({idUsuario: usuario._id})
    usuario.idCarrito = carrito._id
    usuario.idFavoritos = fav._id
    await carrito.save();
    await fav.save();
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
      return {code: 400};
    }
    const validarPass = bcrypt.compareSync(
      body.password,
      usuarioExistente.password
    );
    if (validarPass) {
      const payload = {
        _id: usuarioExistente._id,
        rol: usuarioExistente.rol,
        bloqueado: usuarioExistente.bloqueado,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return {
        code: 200,
        token,
      };
    } else {
      return {code: 400}
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
