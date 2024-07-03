/* BUILD: srcript de React. Pasa los archivos estáticos a html, css y js. 
Crea una carpeta de archivos estaticos para subirlos al server */

// Index.js tiene que estar lo más liviano posible.

const Server = require('./server/config') //instanciar la clase
const server = new Server()

server.listen()
