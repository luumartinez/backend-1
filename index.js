/* DEV DEPENDENCIES: son para los desarrollo
DEPENDENCIES: se usan en desarrollo y producción
- script: agregego -> node --watch index.js // para no estar levantando y cortando el servidor después de guardar cambios

nodemon no sirve en producción porque para trabajar ahí se corta el servidor, se suben los cambios y se vuelve a lenvantar el servidor
node_modules: almacena todas la librerías y lo que se necesita para que el server funcione
*/

const express = require("express");
const app = express(); //para levantar el servidor
const path = require('path')

/* LEVANTAR SERVIDOR */
/* app.listen(3001, () =>{
    console.log('Server ok')
}) */
/* Reemplazo por una variable: */
const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server Ok: ", PORT);
});

/* ENDPOINT: construido por ruta, middleware(opcional) y controlador(handler: req, res). Es el punto de acceso a la API 
- MIDDLEWARE: pequeñas funciones que se ejecutan entre una ruta y un controlador o ANTES de la ruta.
  se genera con express:
*/
app.use(express.json()); // eso habilita que junte todos los chunk en un json
app.use(express.static(path.join(__dirname, 'public'))) // va a mostrar en el front lo que esté en la carpeta public. JOIN: une, concatena
//dirname concatena todo el camino desde la raíz hasta public (sin importar si tiene / o barra invertida)


let productos = [
  {
    id: 1,
    nombre: "Celular",
    precio: 2000,
  },
  {
    id: 2,
    nombre: "Tablet",
    precio: 5000,
  },
];

// GET
/* TRAER TODOS LOS PRODUCTOS */
/* app.get('/api/productos', (req, res)=>{
    // request: petición del front al back
    // response: respuesta del back al front. Se construye con STATUS y FORMATO
    //res.send -> solo para mandar texto plano
    res.status(200).json(productos) //STATUS y FORMATO
    //res.status(200).json({msg:'Productos encontrados', productos})
}) */

/* TRAER UN PRODUCTO
Para traer (req) existen tres formas:
- body: traer el cuepro por ej un formulario
- query: se va a recibir un dato. No modifica la ruta, se pasa el dato a la rato usando '?' -> req.query.id -> /api/productos?id=1
- params (parámetro):  se tiene que especificar en la ruta -> /api/productos/:parametro
*/

/* PARAMS */
app.get("/api/productos/:idProducto", (req, res) => {
  // typeof (propiedad que nos dice que tipo de respuesta obtenemos)
  // console.log(typeof id)
  const id = Number(req.params.idProducto); //es necesario parsearlo porque si no lo toma como string
  const producto = productos.find((prod) => prod.id === id);
  res.status(200).json(producto);
});

/* QUERY */
// Puedo simplicar traer todos los productos y por query en una misma funcion porque la ruta no cambia (o sea usa el mismo endpoint)
//HAPPY PATH
/* app.get('/api/productos', (req, res) =>{
    let id = Number(req.query.id)
    if(id){
        const producto = productos.find((prod)=> prod.id === id)
        res.status(200).json(producto)
    } else {
        res.status(200).json(productos)
    }
}); */
// TRY - CATCH: Para manejar casos negativos también
app.get("/api/productos", (req, res) => {
  try {
    let id = Number(req.query.id);
    if (id) {
      const producto = productos.find((prod) => prod.id === id);
      res.status(200).json(producto);
    } else {
      res.status(200).json(productos);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST
app.post("/api/productos", (req, res) => {
  try {
    // const dataProducto = req.body
    // const {nombre, precio} = req.body // pata desestructura
    // spread operator: ... -> toma el objeto que le pasas y agrega más info
    const nuevoProducto = {
      // productos.length-1 -> el último elemento del array
      id: productos[productos.length - 1].id + 1,
      ...req.body,
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT
// uso params porque gralmente se edita de a UN producto
app.put("/api/productos/:idProducto", (req, res) => {
  try {
    const id = Number(req.params.idProducto);
    // findIndex -> devuelve la posición en el array
    const posicionProdEnElArray = productos.findIndex((prod) => prod.id === id);
    const productoEditado = {
      id,
      ...req.body,
    };
    productos[posicionProdEnElArray] = productoEditado;
    res.status(200).json(productoEditado);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
app.delete('/api/productos/:idProducto', (req, res) =>{
    try {
        const id = Number(req.params.idProducto)
        const productosNoBorrados = productos.filter((prod) => prod.id !== id)
        productos = productosNoBorrados
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json(error)
    }
})
