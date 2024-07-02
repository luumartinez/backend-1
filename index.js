/* BUILD: srcript de React. Pasa los archivos estáticos a html, css y js. 
Crea una carpeta de archivos estaticos para subirlos al server */

// Index.js tiene que estar lo más liviano posible.

const Server = require('./server/config')
const server = new Server //instanciar la clase

server.listen()