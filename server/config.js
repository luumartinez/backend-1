const express = require("express");
const path = require("path");
const cors = require("cors");

class Server {
  //para hacerlo más escalable
  constructor() {
    //asignas los atributos
    this.app = express();
    this.port = process.env.PORT || 8080; //process: atributo nativo de node. Objeto que contiene las variables de entorno.
    //env -> lo trato como objeto
    // ||-> para levantarlo en ese puerto si el de PORT no funciona

    this.middleware(); //tiene que estar ANTES que routes porque si no primero se ejecuta rutas y ahí queda
    this.routes(); //invocar para que funcione
  }

  /* MIDDLEWARES: se ejecuta ANTES de la ruta ó entre la ruta y el controlador*/
  middleware() {
    /* Middlewares */
    this.app.use(express.json());
    /* Archivos estáticos */
    this.app.use(express.static(path.join(__dirname, "public")));
    /* CORS: cabecera grande de permisos que manda el server */
    /* Cuando tenemos front corriendo en un puerto y queremos consumir del puerto del back: por permisos, el navegador
       bloquea la petición -> el servicio no tiene habilitado los cors.
       libreria cors*/
    this.app.use(cors())

  }
  routes() {
    this.app.use('/api/productos', require('../routes/productos.routes')) //Configura una ruta por defecto
    // this.app.use('/api/usuarios', require('../routes/usuarios.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Ok: ", this.port);
    });
  }
}

module.exports = Server; //si quiero exportar más clases las exporto como un objeto {}
