const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  rol: {
    type: String,
    default: "usuario",
    enum: ['usuario', 'admin']
  },

  bloqueado: {
    type: Boolean,
    default: false
  },

  idCarrito: {
    type: String
  },

  idFavoritos: {
    type: String
  }
});

UsuarioSchema.methods.toJSON = function() {
  const { password, __v, ...usuario } = this.toObject()
  return usuario
}

const UsuarioModel = model('user', UsuarioSchema)
module.exports = UsuarioModel