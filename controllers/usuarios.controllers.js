let usuarios = [
  {
    id: 1,
    nombreUsuario: "lucifer13",
    email: "lucifer13@gmail.com",
    pass: "123456",
    baja: false,
  },
];

const registrarUsuario = (req, res) => {
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
        return res
          .status(201)
          .json({ msg: "Usuario registrado con éxito", usuarioNuevo });
      }
    } else {
      res.status(400).json("El email ya se encuentra registrado");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const mostrarTodosLosUsuariosOUno = (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      const usuario = usuarios.find((user) => user.id === id);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json("Usuario no encontrado");
      }
    } else {
      res.status(200).json(usuarios);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const mostrarUsuarioXId = (req, res) => {
  try {
    const id = req.params.idUsuario;
    const usuario = usuarios.find((user) => user.id === id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//DESHABILITO UN USUARIO
const bajaLogicaUsuario = (req, res) => {
  try {
    const id = req.params.idUsuario;
    const posicionDelUsuario = usuarios.findIndex(
      (usuario) => usuario.id === id
    );
    usuarios[posicionDelUsuario].baja = !usuarios[posicionDelUsuario].baja; //invierte el valor booleano
    const mensaje = usuarios[posicionDelUsuario].baja ? 'Usuario bloqueado' : 'Usuario activo'
    res.status(200).json({ msg: mensaje});
  } catch (error) {
    res.status(500).json(error);
  }
};

// Lo elimina DEFINITIVAMENTE
const bajaFisicaUsuario = (req, res) => {
  try {
    const id = req.params.idUsuario;
    const posicionDelUsuario = usuarios.findIndex(
      (usuario) => usuario.id === id
    );
    usuarios.splice(posicionDelUsuario, 1);

    res.status(200).json({ msg: "Usuario borrado", usuarios });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  registrarUsuario,
  mostrarTodosLosUsuariosOUno,
  mostrarUsuarioXId,
  bajaLogicaUsuario,
  bajaFisicaUsuario,
};
