let usuarios = [
  {
    id: 1,
    nombreUsuario: "lucifer13",
    email: "lucifer13@gmail.com",
    pass: "123456",
    baja: false,
  },
];

const nuevoUsuario = (body) => {
  try {
    const body = req.body;
    const usuarioExistente = usuarios.find(
      (usuario) => usuario.nombreUsuario === body.nombreUsuario
    );
    const emailExistente = usuarios.find(
      (usuario) => usuario.email === body.email
    );
    if (!emailExistente) {
      if (usuarioExistente) {
        return res.status(400).json("El usuario ya está registrado");
      } else {
        const id = crypto.randomUUID();
        let usuarioNuevo = { id, ...req.body, baja: false };
        usuarios.push(usuarioNuevo);
        return 201;
      }
    } else {
      res.status(400).json("El email ya se encuentra registrado");
    }
  } catch (error) {
    console.log(error);
  }
};

const obtenerTodosLosUsuarios = () => {
  try {
    return usuarios;
  } catch (error) {
    console.log(error);
  }
};

const obtenerUsuarioXID = (idUsuario) => {
  try {
    const usuarioID = usuarios.find((usuario) => usuario.id === idUsuario);
    return usuarioID;
  } catch (error) {
    console.log(error);
  }
};

const eliminarUsuario = (idUsuario) => {
  try {
    const posicionDelUsuario = usuarios.findIndex(
      (usuario) => usuario.id === id
    );
    usuarios.splice(posicionDelUsuario, 1);
    return 200;
  } catch (error) {
    console.log(error);
  }
};

const deshabilitarUsuario = (idUsuario) => {
  try {
    const posicionDelUsuario = usuarios.findIndex(
      (usuario) => usuario.id === id
    );
    usuarios[posicionDelUsuario].baja = !usuarios[posicionDelUsuario].baja; //invierte el valor booleano
    const mensaje = usuarios[posicionDelUsuario].baja
      ? "Usuario bloqueado"
      : "Usuario activo";
      return mensaje
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  nuevoUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioXID,
  eliminarUsuario,
  deshabilitarUsuario
};
